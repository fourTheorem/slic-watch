'use strict'

/*
 * Determine the presentation name for an alarm statistic
 *
 * @param {*} AlarmProperties Alarm configuration
 */
export function getStatisticName (AlarmProperties) {
  return AlarmProperties.Statistic ?? AlarmProperties.ExtendedStatistic
}
