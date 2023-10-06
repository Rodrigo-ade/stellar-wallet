const shouldInstrumentCode = 'INSTRUMENT_CODE' in process.env;

module.exports = {
  presets: ['next/babel'],
  plugins: shouldInstrumentCode ? ['istanbul'] : [],
};
