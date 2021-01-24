import React, { createRef, useContext, useEffect, useState } from 'react';
import { Button, Card, Icon, Image, Message } from 'semantic-ui-react';
import axios from 'axios';
import dayjs from 'dayjs';
import {AuthContext,SubmitContext} from '../../context';
import { Wrapper } from '../styles/attachments.styles';

import addedImg from '../../assets/img/wireframe.png';
import statementImg from '../../assets/img/statement.jpg';
import reportImg from '../../assets/img/reportCard.jpg';

const Attachments = () => {
    const authContext = useContext(AuthContext);
    const { resetTimeLeft } = authContext;

  const submitContext = useContext(SubmitContext);
  const {
    newSubmit,
    updateNewSubmit,
    submitMode,
    curSubmit,
    updateCurSubmit,
    submitToWatch,
  } = submitContext;

  const [curDocument, setCurDocument] = useState(null);

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
         [`${res.data.type}Id`]: null,
         [`${res.data.type}Checksum`]: null, //virtual
         [`${res.data.type}CreatedAt`]:null, //virtual
       });
     } else if (submitMode === 'new') {
       await updateNewSubmit({
         ...newSubmit,
         [`${res.data.type}Id`]: null,
         [`${res.data.type}Checksum`]: null, //virtual
         [`${res.data.type}CreatedAt`]: null, //virtual
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
      });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', fileInputRef.current.name);

    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      const res = await axios.post('/api/v1/files/upload', formData, headers);

      if (submitMode === 'edit') {
        await updateCurSubmit({
          ...curSubmit,
          [`${res.data.file.type}Id`]: res.data.file.id,
          [`${res.data.file.type}Checksum`]: res.data.file.checksum, //virtual
          [`${res.data.file.type}CreatedAt`]: res.data.file.createdAt, //virtual
        });
      } else if (submitMode === 'new') {
        await updateNewSubmit({
          ...newSubmit,
          [`${res.data.file.type}Id`]: res.data.file.id,
          [`${res.data.file.type}Checksum`]: res.data.file.checksum, //virtual
          [`${res.data.file.type}CreatedAt`]: res.data.file.createdAt, //virtual
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    resetTimeLeft()
    if (submitMode === 'new') {
      setCurDocument(newSubmit);
      } else if (submitMode === 'edit') {
      setCurDocument(curSubmit);
      } else if (submitMode === 'watch') {
      setCurDocument(submitToWatch);
      }
  }, [submitMode, submitToWatch, newSubmit, curSubmit]);

  return (
    <Wrapper submitMode={submitMode}>
      <input
        type='file'
        hidden={true}
        ref={fileInputRef}
        onChange={uploadImage}
      />

      <Message info size='medium' floating>
        <Message.Header>Dodawanie załączników</Message.Header>
        <p>
          W tej części wniosku należy dodać 2 różne typy załączników:{' '}
          <strong>Oświadczenie opiekuna dydaktycznego</strong> oraz{' '}
          <strong>Świadectwo szkolne za ostatni rok szkolny</strong>
          Pamiętaj, iż dopuszczalna wielkość każdego z plików (załączników) to
          20MB. Dopuszatne formaty plików to: <strong>
            {' '}
            .pdf, .jpg.{' '}
          </strong>oraz <strong>.png.</strong> Kliknij w odpowiednie pole, aby
          dodać dokument właściwego typu. Jeśli chcesz zamienić plik, klikniej
          ponownie we włąściwą część.
        </p>
      </Message>

      <Card.Group itemsPerRow={4} stackable>
        <Card className='card' onClick={() => openFileInput('statement')}>
          {curDocument &&
            (curDocument.statementId ? (
              <div className='placeholder-image'>
                <div className='img-button'>
                  <Button
                    onClick={(e) => callFetch(e, curDocument.statementId)}
                    primary
                    icon
                    size='tiny'
                  >
                    <Icon name='download' />
                  </Button>
                  <Button
                    onClick={(e) => deleteFile(e, curDocument.statementId)}
                    className='trash-btn'
                    color='red'
                    icon
                    size='tiny'
                  >
                    <Icon name='trash' />
                  </Button>
                </div>
                <Image
                  fluid
                  label={{
                    as: 'a',
                    color: 'green',
                    content: 'Plik dodany',
                    icon: 'thumbs up',
                    ribbon: true,
                  }}
                  src={statementImg}
                />
              </div>
            ) : (
              <Image
                fluid
                label={{
                  as: 'a',
                  color: 'red',
                  content: 'Kliknij i dodaj plik',
                  icon: 'upload',
                  ribbon: true,
                }}
                src={addedImg}
              />
            ))}
          <Card.Content>
            <Card.Header textAlign='left'>
              Oświadczenie opiekuna dydaktycznego
            </Card.Header>
            <Card.Meta textAlign='left'>
              {curDocument && curDocument.statementCreatedAt && (
                <span className='date'>
                  Dodano:{' '}
                  {dayjs(curDocument?.statementCreatedAt).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )}{' '}
                </span>
              )}
            </Card.Meta>
            <Card.Meta textAlign='left'>
              {curDocument && curDocument.statementChecksum && (
                <div className='date' style={{ wordWrap: 'break-word' }}>
                  Suma kontrolna pliku:{' '}
                  <strong> {curDocument.statementChecksum}</strong>
                </div>
              )}
            </Card.Meta>
          </Card.Content>
        </Card>

        <Card onClick={() => openFileInput('report_card')}>
          {curDocument &&
            (curDocument.report_cardId ? (
              <div className='placeholder-image'>
                <div className='img-button'>
                  <Button
                    onClick={(e) => callFetch(e, curDocument.report_cardId)}
                    primary
                    icon
                    size='tiny'
                  >
                    <Icon name='download' />
                  </Button>
                  <Button
                    onClick={(e) => deleteFile(e, curDocument.report_cardId)}
                    className='trash-btn'
                    color='red'
                    icon
                    size='tiny'
                  >
                    <Icon name='trash' />
                  </Button>
                </div>
                <Image
                  fluid
                  label={{
                    as: 'a',
                    color: 'green',
                    content: 'Plik dodany',
                    icon: 'thumbs up',
                    ribbon: true,
                  }}
                  src={reportImg}
                />
              </div>
            ) : (
              <Image
                fluid
                label={{
                  as: 'a',
                  color: 'red',
                  content: 'Kliknij i dodaj plik',
                  icon: 'upload',
                  ribbon: true,
                }}
                src={addedImg}
              />
            ))}
          <Card.Content>
            <Card.Header textAlign='left'>
              Świadectwo szkolne - ostatni rok szkolny
            </Card.Header>
            <Card.Meta textAlign='left'>
              {curDocument && curDocument.report_cardCreatedAt && (
                <span className='date'>
                  Dodano:{' '}
                  {dayjs(curDocument?.report_cardCreatedAt).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )}{' '}
                </span>
              )}
            </Card.Meta>
            <Card.Meta textAlign='left'>
              {curDocument && curDocument.report_cardChecksum && (
                <div className='date' style={{ wordWrap: 'break-word' }}>
                  Suma kontrolna pliku:{' '}
                  <strong> {curDocument.report_cardChecksum}</strong>
                </div>
              )}
            </Card.Meta>
            <Card.Description textAlign='left'></Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </Wrapper>
  );
};

export default Attachments;
