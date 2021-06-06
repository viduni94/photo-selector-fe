// eslint-disable-next-line import/prefer-default-export
export const to = promise => {
  return promise.then(res => [undefined, res]).catch(error => [error]);
};
