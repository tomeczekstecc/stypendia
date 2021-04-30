export const getCsrf = async (req, res) => {

  return res.status(200).json({ csrf: req.session.XSRF_Token });
}