import axios from 'axios';

export const fetchPdf = (numer) => {
  axios
    .get(`/api/v1/pdf/submit/${numer}`, {
      responseType: 'blob',
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${numer}.pdf`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
};
