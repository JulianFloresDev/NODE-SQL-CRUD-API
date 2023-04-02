export const getUsers = async (req, res, next) => {
  await res.json({
    message: 'Usser controller called success',
  });
};
