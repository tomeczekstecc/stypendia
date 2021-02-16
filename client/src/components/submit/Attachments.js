import React, { createRef, useContext, useEffect, useState } from 'react';
import { Button, Card, Icon, Image, Label, Message } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext, SubmitContext, AlertContext } from '../../context';
import { Wrapper } from '../styles/attachments.styles';

import {
  statementImg,
  wireframeImg,
  reportCardImg,
  diplomaImg,
  fileImg,
} from '../../assets/img';
import SubALayout from '../subALayout';
import { toLocaleDate } from '../../utils';
import RandomAtt from './RandomAtt';

const Attachments = () => {
  const getUsersFiles = async () => {
    const res = await axios.get(`/api/v1/files/info`, { submitMode });
    if (submitMode === 'new') {
      setStatement(
        res.data.files.filter(
          (f) =>
            !f.submitId && f.tempSubmitId === tempUuid && f.type === 'statement'
        )
      );
      setReportCard(
        res.data.files.filter(
          (f) =>
            !f.submitId &&
            f.tempSubmitId === tempUuid &&
            f.type === 'report_card'
        )
      );
      setAllowance(
        res.data.files.filter(
          (f) =>
            !f.submitId && f.tempSubmitId === tempUuid && f.type === 'allowance'
        )
      );
      setAttestation(
        res.data.files.filter(
          (f) =>
            !f.submitId &&
            f.tempSubmitId === tempUuid &&
            f.type === 'attestation'
        )
      );
    } else {
      setStatement(
        res.data.files.filter((f) => f.submitId && f.type === 'statement')
      );
      setReportCard(
        res.data.files.filter((f) => f.submitId && f.type === 'report_card')
      );
      setAllowance(
        res.data.files.filter((f) => f.submitId && f.type === 'allowance')
      );
      setAttestation(
        res.data.files.filter((f) => f.submitId && f.type === 'attestation')
      );
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
  const [statement, setStatement] = useState({});
  const [report_card, setReportCard] = useState({});
  const [allowance, setAllowance] = useState({});
  const [attestation, setAttestation] = useState({});

  const fileInputRef = createRef();

  const openFileInput = (type) => {
    if (type === 'statement' && statement.length > 0) return;
    if (type === 'report_card' && report_card.length > 0) return;
    if (type === 'allowance' && allowance.length > 0) return;
    if (type === 'attestation' && attestation.length > 0) return;

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
    console.log(statement, report_card, allowance, attestation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitMode, submitToWatch, newSubmit, curSubmit]);

  return (
    <Wrapper
      statementDisabled={statement.length > 0}
      report_cardDisabled={report_card.length > 0}
      allowanceDisabled={allowance.length > 0}
      attestationDisabled={attestation.length > 0}
      submitMode={submitMode}
    >
      <SubALayout leadHeader='CZĘŚĆ A – ZAŁĄCZNIKI'>
        <input
          type='file'
          hidden={true}
          ref={fileInputRef}
          onChange={uploadImage}
        />
        <Message info floating>
          <Message.Header>Dodawanie załączników</Message.Header>
          <p>
            W tej części wniosku należy dodać załączniki obowiązkowe:{' '}
            <strong>Oświadczenie opiekuna dydaktycznego</strong> oraz{' '}
            <strong>Świadectwo szkolne za ostatni rok szkolny</strong>.
            Dodatkowo, w zależności od udzeielonych odpowiedzi w części VI.
            DODATKOWE KRYTERIA, możesz dodać jedną zgodę na indywidualny tryb
            nauki oraz jeden załącznik związany z orzeczeniem o
            niepełnosprawności. Możesz także dodać załączniki potwierdzające
            uzyskanie tytułu w olimpiadach. Pamiętaj, iż dopuszczalna wielkość
            każdego z plików (załączników) to 20MB. Dopuszatne formaty plików
            to: <strong> .pdf, .jpg. </strong>
            oraz <strong>.png.</strong> Kliknij w odpowiednie pole, aby dodać
            dokument właściwego typu. Jeśli chcesz zamienić plik, klikniej
            ponownie we włąściwą część.
          </p>
        </Message>
        <Card.Group itemsPerRow={4} stackable>
          <Card
            className='card-item statement'
            as='h3'
            onClick={() => openFileInput('statement')}
          >
            {statement[0] ? (
              <>
                <div className='img-button'>
                  <Button
                    onClick={(e) => callFetch(e, statement[0].id)}
                    primary
                    icon
                    size='tiny'
                    className='download-btn btn'
                  >
                    <Icon name='download' />
                  </Button>

                  <Button
                    onClick={(e) => deleteFile(e, statement[0].id)}
                    className='trash-btn btn'
                    color='red'
                    size='tiny'
                    icon
                  >
                    <Icon name='trash' />
                  </Button>
                </div>
                <Image
                  className='img-c'
                  fluid
                  label={{
                    as: 'div',
                    color: 'green',
                    content: 'Plik dodany',
                    icon: 'thumbs up',
                    ribbon: true,
                  }}
                  src={statementImg}
                />
              </>
            ) : (
              <Image
                fluid
                label={{
                  as: 'div',
                  color: 'red',
                  content: 'Kliknij i dodaj plik',
                  icon: 'upload',
                  ribbon: true,
                }}
                src={wireframeImg}
              />
            )}

            <Card.Content>
              {submitErrors?.statement && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text att'
                >
                  {submitErrors?.statement}
                </Label>
              )}
              <Card.Header className='card-header' textAlign='left'>
                Oświadczenie opiekuna dydaktycznego -{' '}
                <span className='obligatory'> załącznik obowiązkowy</span>
              </Card.Header>
              <Card.Meta textAlign='left'>
                {statement[0] && statement[0].createdAt && (
                  <span className='date'>
                    Dodano: {toLocaleDate(statement[0]?.createdAt)}
                  </span>
                )}
              </Card.Meta>
              <Card.Meta textAlign='left'>
                {statement[0] && statement[0].checksum && (
                  <div className='date' style={{ wordWrap: 'break-word' }}>
                    Suma kontrolna pliku:{' '}
                    <strong> {statement[0].checksum}</strong>
                  </div>
                )}
              </Card.Meta>
            </Card.Content>
          </Card>

          <Card
            className='card-item report_card'
            as='h3'
            onClick={() => openFileInput('report_card')}
          >
            {report_card[0] ? (
              <>
                <div className='img-button'>
                  <Button
                    onClick={(e) => callFetch(e, report_card[0]?.id)}
                    primary
                    icon
                    size='tiny'
                    className='download-btn btn'
                  >
                    <Icon name='download' />
                  </Button>

                  <Button
                    onClick={(e) => deleteFile(e, report_card[0]?.id)}
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
                  src={reportCardImg}
                />
              </>
            ) : (
              <Image
                fluid
                label={{
                  as: 'div',
                  color: 'red',
                  content: 'Kliknij i dodaj plik',
                  icon: 'upload',
                  ribbon: true,
                }}
                src={wireframeImg}
              />
            )}

            <Card.Content>
              {submitErrors?.report_card && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text att'
                >
                  {submitErrors?.report_card}
                </Label>
              )}
              <Card.Header className='card-header' textAlign='left'>
                Świadectwo szkolne za ostatni rok -{' '}
                <span className='obligatory'> załącznik obowiązkowy</span>
              </Card.Header>
              <Card.Meta textAlign='left'>
                {report_card[0] && report_card[0].createdAt && (
                  <span className='date'>
                    Dodano: {toLocaleDate(report_card[0]?.createdAt)}
                  </span>
                )}
              </Card.Meta>
              <Card.Meta textAlign='left'>
                {report_card[0] && report_card[0].checksum && (
                  <div className='date' style={{ wordWrap: 'break-word' }}>
                    Suma kontrolna pliku:{' '}
                    <strong> {report_card[0].checksum}</strong>
                  </div>
                )}
              </Card.Meta>
            </Card.Content>
          </Card>

          <Card
            className='card-item allowance'
            as='h3'
            onClick={() => openFileInput('allowance')}
          >
            {allowance[0] ? (
              <>
                <div className='img-button'>
                  <Button
                    onClick={(e) => callFetch(e, allowance[0].id)}
                    primary
                    icon
                    size='tiny'
                    className='download-btn btn'
                  >
                    <Icon name='download' />
                  </Button>

                  <Button
                    onClick={(e) => deleteFile(e, allowance[0].id)}
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
                  src={diplomaImg}
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
            )}

            <Card.Content>
              {submitErrors?.isAllowedAtt && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text att'
                >
                  {submitErrors?.isAllowedAtt}
                </Label>
              )}
              <Card.Header className='card-header' textAlign='left'>
                Zgoda na indywidualny tryb nauki
              </Card.Header>
              <Card.Meta textAlign='left'>
                {allowance[0] && allowance[0].createdAt && (
                  <span className='date'>
                    Dodano: {toLocaleDate(allowance[0]?.createdAt)}
                  </span>
                )}
              </Card.Meta>
              <Card.Meta textAlign='left'>
                {allowance[0] && allowance[0].checksum && (
                  <div className='date' style={{ wordWrap: 'break-word' }}>
                    Suma kontrolna pliku:{' '}
                    <strong> {allowance[0].checksum}</strong>
                  </div>
                )}
              </Card.Meta>
            </Card.Content>
          </Card>

          <Card
            className='card-item attestation'
            as='h3'
            onClick={() => openFileInput('attestation')}
          >
            {attestation[0] ? (
              <>
                <div className='img-button'>
                  <Button
                    onClick={(e) => callFetch(e, attestation[0]?.id)}
                    primary
                    icon
                    size='tiny'
                    className='download-btn btn'
                  >
                    <Icon name='download' />
                  </Button>

                  <Button
                    onClick={(e) => deleteFile(e, attestation[0]?.id)}
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
                  src={fileImg}
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
            )}

            <Card.Content>
              {submitErrors?.isHandicapAtt && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text att'
                >
                  {submitErrors?.isHandicapAtt}
                </Label>
              )}
              <Card.Header className='card-header' textAlign='left'>
                Orzeczenie o niepełnosprawności
              </Card.Header>
              <Card.Meta textAlign='left'>
                {attestation[0] && attestation[0].createdAt && (
                  <span className='date'>
                    Dodano: {toLocaleDate(attestation[0]?.createdAt)}
                  </span>
                )}
              </Card.Meta>
              <Card.Meta textAlign='left'>
                {attestation[0] && attestation[0].checksum && (
                  <div className='date' style={{ wordWrap: 'break-word' }}>
                    Suma kontrolna pliku:{' '}
                    <strong> {attestation[0].checksum}</strong>
                  </div>
                )}
              </Card.Meta>
            </Card.Content>
          </Card>
        </Card.Group>{' '}
        <RandomAtt />
      </SubALayout>
    </Wrapper>
  );
};

export default Attachments;
