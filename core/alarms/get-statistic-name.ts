
import { type AllAlarms } from './default-config-alarms'

/*
 * Determine the presentation name for an alarm statistic
 *
 * @param {*} AlarmProperties Alarm configuration
 */
export function getStatisticName (AlarmProperties: AllAlarms) {
  return AlarmProperties.Statistic ?? AlarmProperties.ExtendedStatistic
}
