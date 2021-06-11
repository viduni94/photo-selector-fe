// eslint-disable-next-line import/prefer-default-export
export const handle = promise => {
  return promise.then(res => [undefined, res]).catch(error => [error]);
};
