export const getCsrf = async (req, res) => {

console.log(req.session.XSRF_Token)
  return res.status(200).json({ csrf: req.session.XSRF_Token });
}