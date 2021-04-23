'use strict'

module.exports = {
  assertCommonAlarmProperties,
  alarmNameToType
}

function assertCommonAlarmProperties (t, al) {
  t.ok(al.AlarmDescription.length > 0)
  t.ok(al.ActionsEnabled)
  t.equal(al.AlarmActions.length, 1)
  t.ok(al.AlarmActions)
  t.equal(al.ComparisonOperator, 'GreaterThanThreshold')
}

function alarmNameToType (alarmName) {
  return alarmName.split('_')[0]
}
