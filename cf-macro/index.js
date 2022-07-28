'use strict'

const alarms = require('slic-watch-core/alarms')
const CloudFormationTemplate = require('slic-watch-core/cf-template')
const defaultConfig = require('slic-watch-core/default-config')

exports.handler =  async function(event, context) {
  console.info("Received event", {event})
  const response = processFragment( event );
  console.info("Returning", JSON.stringify(response));
  return response;
}

function processFragment( event ){
   let status = "success"
   let outputFragment = event.fragment; 
    try {

      const alarmActions = []
      if (process.env.SNSTopic) {
        alarmActions.push(process.env.SNSTopic)
      }
      const context = {
        alarmActions
      }
      const cfTemplate = CloudFormationTemplate(
        //JSON.parse(outputFragment)
        outputFragment
      )
      const serverless = {cli:console};
      const functionAlarmConfigs = {}

      //ToDo: temp fix to fill functionAlarmConfigs required by Alarms implementation
      const lambdaResources = cfTemplate.getResourcesByType(
        'AWS::Lambda::Function'
      );
      for (const [funcResourceName, funcResource] of Object.entries(lambdaResources)) {
        functionAlarmConfigs[funcResource.Properties.FunctionName] =  {}
      }
      //ToDo: temp fix end
  
      const alarmservice = alarms(serverless, defaultConfig.alarms, functionAlarmConfigs, context)
      alarmservice.addAlarms(cfTemplate)
      outputFragment = cfTemplate.getSourceObject();
     
    } catch (err) {
      console.error(err);
      status = "fail"
    }
    
    return {
        "requestId": event.requestId,
        "status": status,
        "fragment": outputFragment
    }
}