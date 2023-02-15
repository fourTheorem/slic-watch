'use strict'

/*
 * Determine the presentation name for an alarm statistic
 *
 * @param {*} alarmConfig Alarm configuration
 */
export function getStatisticName (alarmConfig) {
  return alarmConfig.Statistic || alarmConfig.ExtendedStatistic
}
