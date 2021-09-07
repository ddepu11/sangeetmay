//Clear All Intervals Or Timeouts

const clearAllIntervalsAndTimeOuts = (intervalOrTimeoutIds: number) => {
  while (intervalOrTimeoutIds) {
    clearInterval(intervalOrTimeoutIds);
    intervalOrTimeoutIds--;
  }
};

export default clearAllIntervalsAndTimeOuts;
