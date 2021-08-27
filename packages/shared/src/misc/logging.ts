// eslint-disable-next-line @typescript-eslint/no-empty-function, no-console
export const log = !process.env.SILENT
  ? console.log.bind(console)
  : function () {}
