import { getRepository } from 'typeorm';
import { File } from '../entity/File';
import { msg } from '../parts/messages';

export const checkForAtt = async (req, oldErrors, mode) => {
  if (mode === 'new') {
    let errors: any = {};
    //// statement
    const statement = await getRepository(File)
      .createQueryBuilder('file')
      .select()
      .where('tempSubmitId = :tempSubmitId and type = :type', {
        tempSubmitId: req.body.tempUuid,
        type: 'statement',
      })
      .execute();
    if (statement.length === 0) errors.statement = msg.client.fail.noStatement;
    ///// report_card
    const report_card = await getRepository(File)
      .createQueryBuilder('file')
      .select()
      .where('tempSubmitId = :tempSubmitId and type = :type', {
        tempSubmitId: req.body.tempUuid,
        type: 'report_card',
      })
      .execute();
    if (report_card.length === 0)
      errors.report_card = msg.client.fail.noReportCard;

    ///// finalist

    const isFinalist = await getRepository(File)
      .createQueryBuilder('file')
      .select()
      .where('tempSubmitId = :tempSubmitId and type = :type', {
        tempSubmitId: req.body.tempUuid,
        type: 'random',
      })
      .execute();

    if (
      (req.body.isFinalist === 'Tak' || req.body.isFinalist === 1) &&
      isFinalist.length === 0
    )
      errors.isFinalistAtt = msg.client.fail.noRandoms;

    if (
      (req.body.isFinalist === 'Nie' || req.body.isFinalist === 0) &&
      isFinalist.length != 0
    )
      errors.isFinalist = msg.client.fail.unnecRandoms;

    ///// allowed

    const isAllowed = await getRepository(File)
      .createQueryBuilder('file')
      .select()
      .where('tempSubmitId = :tempSubmitId and type = :type', {
        tempSubmitId: req.body.tempUuid,
        type: 'allowance',
      })
      .execute();

    if (
      (req.body.isAllowed === 'Tak' || req.body.isAllowed === 1) &&
      isAllowed.length === 0
    )
      errors.isAllowedAtt = msg.client.fail.noAllowance;

    if (
      (req.body.isAllowed === 'Nie' || req.body.isAllowed === 0) &&
      isAllowed.length != 0
    )
      errors.isAllowed = msg.client.fail.unnecAllowance;

    ///// handicap

    const isHandicap = await getRepository(File)
      .createQueryBuilder('file')
      .select()
      .where('tempSubmitId = :tempSubmitId and type = :type', {
        tempSubmitId: req.body.tempUuid,
        type: 'attestation',
      })
      .execute();

    if (
      (req.body.isHandicap === 'Tak' || req.body.isHandicap === 1) &&
      isHandicap.length === 0
    )
      errors.isHandicapAtt = msg.client.fail.noAttestation;

    if (
      (req.body.isHandicap === 'Nie' || req.body.isHandicap === 0) &&
      isHandicap.length != 0
    )
      errors.isHandicap = msg.client.fail.unnecAttestation;

    const allErrors = { ...errors, ...oldErrors };

    return allErrors;
  } else {
    let errors: any = {};
    const statement = await getRepository(File)
      .createQueryBuilder('file')
      .select()
      .where('submitId = :submitId and type = :type', {
        submitId: req.body.id,
        type: 'statement',
      })
      .execute();
    if (statement.length === 0) errors.statement = msg.client.fail.noStatement;

    const report_card = await getRepository(File)
      .createQueryBuilder('file')
      .select()
      .where('submitId = :submitId and type = :type', {
        submitId: req.body.id,
        type: 'report_card',
      })
      .execute();
    if (report_card.length === 0)
      errors.report_card = msg.client.fail.noReportCard;

    const isFinalist = await getRepository(File)
      .createQueryBuilder('file')
      .select()
      .where('submitId = :submitId and type = :type', {
        submitId: req.body.id,
        type: 'random',
      })
      .execute();

    if (
      (req.body.isFinalist === 'Tak' || req.body.isFinalist === 1) &&
      isFinalist.length === 0
    )
      errors.isFinalistAtt = msg.client.fail.noRandoms;

    if (
      (req.body.isFinalist === 'Nie' || req.body.isFinalist === 0) &&
      isFinalist.length != 0
    )
      errors.isFinalist = msg.client.fail.unnecRandoms;

    const isAllowed = await getRepository(File)
      .createQueryBuilder('file')
      .select()
      .where('submitId = :submitId and type = :type', {
        submitId: req.body.id,
        type: 'allowance',
      })
      .execute();

    if (
      (req.body.isAllowed === 'Tak' || req.body.isAllowed === 1) &&
      isAllowed.length === 0
    )
      errors.isAllowedAtt = msg.client.fail.noAllowance;

    if (
      (req.body.isAllowed === 'Nie' || req.body.isAllowed === 0) &&
      isAllowed.length != 0
    )
      errors.isAllowed = msg.client.fail.unnecAllowance;

    const isHandicap = await getRepository(File)
      .createQueryBuilder('file')
      .select()
      .where('submitId = :submitId and type = :type', {
        submitId: req.body.id,
        type: 'attestation',
      })
      .execute();
    if (
      (req.body.isHandicap === 'Tak' || req.body.isHandicap === 1) &&
      isHandicap.length === 0
    )
      errors.isHandicapAtt = msg.client.fail.noAttestation;

    if (
      (req.body.isHandicap === 'Nie' || req.body.isHandicap === 0) &&
      isHandicap.length != 0
    )
      errors.isHandicap = msg.client.fail.unnecAttestation;

    const allErrors = { ...errors, ...oldErrors };

    return allErrors;
  }
};
