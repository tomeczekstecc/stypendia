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
    if (req.body.isFinalist === 'Tak' || req.body.isFinalist === 1) {
      const isFinalist = await getRepository(File)
        .createQueryBuilder('file')
        .select()
        .where('tempSubmitId = :tempSubmitId and type = :type', {
          tempSubmitId: req.body.tempUuid,
          type: 'random',
        })
        .execute();

      if (isFinalist.length === 0)
        errors.isFinalistAtt = msg.client.fail.noRandoms;
    }
    ///// allowed
    if (req.body.isAllowed === 'Tak' || req.body.isAllowed === 1) {
      const isAllowed = await getRepository(File)
        .createQueryBuilder('file')
        .select()
        .where('tempSubmitId = :tempSubmitId and type = :type', {
          tempSubmitId: req.body.tempUuid,
          type: 'allowance',
        })
        .execute();
      if (isAllowed.length === 0)
        errors.isAllowedAtt = msg.client.fail.noAllowance;
    }
    ///// handicap
    if (req.body.isHandicap === 'Tak' || req.body.isHandicap === 1) {
      const isHandicap = await getRepository(File)
        .createQueryBuilder('file')
        .select()
        .where('tempSubmitId = :tempSubmitId and type = :type', {
          tempSubmitId: req.body.tempUuid,
          type: 'attestation',
        })
        .execute();
      if (isHandicap.length === 0)
        errors.isHandicapAtt = msg.client.fail.noAttestation;
    }
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

    if (req.body.isFinalist === 'Tak' || req.body.isFinalist === 1) {
      const isFinalist = await getRepository(File)
        .createQueryBuilder('file')
        .select()
        .where('submitId = :submitId and type = :type', {
          submitId: req.body.id,
          type: 'random',
        })
        .execute();
      if (isFinalist.length === 0)
        errors.isFinalistAtt = msg.client.fail.noRandoms;
    }

    if (req.body.isAllowed === 'Tak' || req.body.isAllowed === 1) {
      const isAllowed = await getRepository(File)
        .createQueryBuilder('file')
        .select()
        .where('submitId = :submitId and type = :type', {
          submitId: req.body.id,
          type: 'allowance',
        })
        .execute();
      if (isAllowed.length === 0)
        errors.isAllowedAtt = msg.client.fail.noAllowance;
    }

    if (req.body.isHandicap === 'Tak' || req.body.isHandicap === 1) {
      const isHandicap = await getRepository(File)
        .createQueryBuilder('file')
        .select()
        .where('submitId = :submitId and type = :type', {
          submitId: req.body.id,
          type: 'attestation',
        })
        .execute();
      if (isHandicap.length === 0)
        errors.isHandicapAtt = msg.client.fail.noAttestation;
    }
    const allErrors = { ...errors, ...oldErrors };

    return allErrors;
  }
};
