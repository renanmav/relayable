module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      'relay',
      {
        schema: '../server/data/schema.json',
      },
    ],
  ],
}
