import React, { createRef, useContext, useEffect, useState } from 'react';
import { Button, Card, Icon, Image, Label, Message } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext, SubmitContext, AlertContext } from '../../context';
import { Wrapper } from '../styles/attachments.styles';

import addedImg from '../../assets/img/wireframe.png';
import { prizeImg, medalsImg, wireframeImg } from '../../assets/img';
import SubALayout from '../subALayout';
import { toLocaleDate } from '../../utils';

const RandomAtt = () => {
  const getUsersFiles = async () => {
    const res = await axios.get(`/api/v1/files/info`, { submitMode });
    if (submitMode === 'new') {
      setFiles(res.data.files.filter((f) => !f.submitId));
      console.log(res.data.files.filter((f) => !f.submitId));
    } else {
      setFiles(res.data.files.filter((f) => f.submitId));
      console.log(res.data.files.filter((f) => f.submitId));
    }
  };

  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { resetTimeLeft } = authContext;
  const alertContext = useContext(AlertContext);

  const { addAlert } = alertContext;

  const submitContext = useContext(SubmitContext);
  const {
    newSubmit,
    updateNewSubmit,
    submitMode,
    curSubmit,
    updateCurSubmit,
    submitToWatch,
    submitErrors,
    tempUuid,
  } = submitContext;
  submitMode === '' && history.push('/');
  const [curDocument, setCurDocument] = useState(null);
  const [files, setFiles] = useState([]);

  const fileInputRef = createRef();
  const openFileInput = (type) => {
    if (submitMode === 'watch') return;
    fileInputRef.current.name = type;
    fileInputRef.current.click();
  };

  const deleteFile = async (e, id) => {
    e.stopPropagation();
    const res = await axios.delete(`/api/v1/files/${id}`);
    if (submitMode === 'edit') {
      await updateCurSubmit({
        ...curSubmit,
        tempUuid,
      });
    } else if (submitMode === 'new') {
      await updateNewSubmit({
        ...newSubmit,
        tempUuid,
      });
    }
  };

  const callFetch = async (e, id) => {
    e.stopPropagation();
    const res = await axios.get(`/api/v1/files/info/${id}`);

    axios
      .get(`/api/v1/files/download/${id}`, {
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', res.data.file.fileName); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
        addAlert(err.response.data);
      });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', fileInputRef.current.name);
    if (submitMode === 'new') {
      formData.append('submitTempId', tempUuid);
    } else {
      formData.append('submitId', curDocument.id || '');
    }

    try {
      const res = await axios.post('/api/v1/files/upload', formData);

      res.data.resStatus !== 'success' && addAlert(res.data);

      if (submitMode === 'edit') {
        await updateCurSubmit({
          ...curSubmit,
        });
      } else if (submitMode === 'new') {
        await updateNewSubmit({
          ...newSubmit,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    resetTimeLeft();
    if (submitMode === 'new') {
      setCurDocument(newSubmit);
    } else if (submitMode === 'edit') {
      setCurDocument(curSubmit);
    } else if (submitMode === 'watch') {
      setCurDocument(submitToWatch);
    }
    getUsersFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitMode, submitToWatch, newSubmit, curSubmit]);

  return (
    <>
      <input
        type='file'
        hidden={true}
        ref={fileInputRef}
        onChange={uploadImage}
      />
      <Card.Group itemsPerRow={4} stackable>
        {files
          .filter((j) => {
            if (submitMode === 'new') {
              return j.tempSubmitId === tempUuid && j.type === 'random';
            } else {
              return j.submitId === curDocument.id && j.type === 'random';
            }
          })
          .map((f, i) => (
            <Card
              key={f.uuid}
              className='card-item random'
              as='h3'
              onClick={() => openFileInput('random')}
            >
              {f &&
                (f.id ? (
                  <>
                    <div className='img-button'>
                      <Button
                        onClick={(e) => callFetch(e, f.id)}
                        primary
                        icon
                        size='tiny'
                        className='download-btn btn'
                      >
                        <Icon name='download' />
                      </Button>

                      <Button
                        onClick={(e) => deleteFile(e, f.id)}
                        className='trash-btn btn'
                        color='red'
                        size='tiny'
                        icon
                      >
                        <Icon name='trash' />
                      </Button>
                    </div>
                    <Image
                      fluid
                      label={{
                        as: 'div',
                        color: 'green',
                        content: 'Plik dodany',
                        icon: 'thumbs up',
                        ribbon: true,
                      }}
                      src={medalsImg}
                    />
                  </>
                ) : (
                  <Image
                    fluid
                    label={{
                      as: 'div',
                      color: 'blue',
                      content: 'Kliknij i dodaj plik',
                      icon: 'upload',
                      ribbon: true,
                    }}
                    src={wireframeImg}
                  />
                ))}

              <Card.Content>
                <Card.Header className='card-header' textAlign='left'>
                  Zaświadczenie o uzyskanym tytule laureata [{i + 1}]
                </Card.Header>
                <Card.Meta textAlign='left'>
                  {f && f.createdAt && (
                    <span className='date'>
                      Dodano: {toLocaleDate(f.createdAt)}
                    </span>
                  )}
                </Card.Meta>
                <Card.Meta textAlign='left'>
                  {f && f.checksum && (
                    <div className='date' style={{ wordWrap: 'break-word' }}>
                      Suma kontrolna pliku: <strong> {f.checksum}</strong>
                    </div>
                  )}
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}

        <Card
          className='card-item'
          as='h3'
          onClick={() => openFileInput('random')}
        >
          <Image
            fluid
            label={{
              as: 'div',
              color: 'blue',
              content: 'Kliknij i dodaj kolejny plik',
              icon: 'upload',
              ribbon: true,
            }}
            src={addedImg}
          />

          <Card.Content>
            <Card.Header className='card-header' textAlign='left'>
              Dodaj zaświadczenie o uzyskanych tytułach
            </Card.Header>
            <Card.Meta textAlign='left'></Card.Meta>
            <Card.Meta textAlign='left'></Card.Meta>
          </Card.Content>
        </Card>
      </Card.Group>{' '}
    </>
  );
};

export default RandomAtt;
