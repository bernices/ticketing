export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({
      // return a promise
      id:"dsfssf"
    }),
  },
};
