import axios from 'axios'

export const updatePdfReady= async (uuid, direction) =>{
  const csrfData = await axios.get('/api/v1/csrf');

  await axios
    .put(`/api/v1/submits/pdfReady`, {
      uuid,
      _csrf: csrfData.data.csrfToken,
      direction
    })
    .then(async (data) => {
      console.log('pdfReady changes');
    })
    .catch((err) => {
      console.log(err.message);
    });
}