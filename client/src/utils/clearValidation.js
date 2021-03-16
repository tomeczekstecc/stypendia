export const clearValidation = (e, submitErrors) => {
  let atts = ['allowance', 'attestation', 'random'];


    if (
    submitErrors &&
    (submitErrors[e?.target?.name] ||
      submitErrors[e?.target?.dataset?.name] ||
      submitErrors[e?.target?.offsetParent?.dataset?.name] ||
      submitErrors[e?.target?.parentElement?.name] ||
      submitErrors[e?.target?.parentElement?.dataset?.name] ||
      submitErrors[e?.target?.parentElement?.parentElement?.dataset?.name] ||
      submitErrors[
        e?.target?.parentElement?.parentElement?.parentElement?.dataset?.name
      ] ||
      submitErrors[
        e?.target?.parentElement?.parentElement?.parentElement?.parentElement
          ?.dataset?.name
      ])
  ) {
    submitErrors[e?.target?.name] = null;
    submitErrors[e?.target?.dataset?.name] = null;

    submitErrors[e?.target?.offsetParent?.dataset?.name] = null;
    submitErrors[e?.target?.parentElement?.name] = null;
    submitErrors[e?.target?.parentElement?.dataset?.name] = null;
    submitErrors[e?.target?.parentElement?.parentElement?.dataset?.name] = null;
    submitErrors[
      e?.target?.parentElement?.parentElement?.parentElement?.dataset?.name
    ] = null;
    submitErrors[
      e?.target?.parentElement?.parentElement?.parentElement?.parentElement?.dataset?.name
    ] = null;
  }

  if (atts.includes(submitErrors && e?.target?.name)) {
    if(e?.target?.name==='allowance') submitErrors.isAllowedAtt = null
    if(e?.target?.name==='attestation') submitErrors.isHandicapAtt = null
    if(e?.target?.name==='random') submitErrors.isFinalistAtt = null
    console.log(e?.target?.name);
    submitErrors[e?.target?.name] = null;
  }
};
