import { Box, Modal, Stack, Button } from "@mui/material";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { useZTheme } from "../../stores/useZTheme";
import { SampleStepper } from "../../components/SampleStepper";
import { useZMspRegisterPage } from "../../stores/useZMspRegisterPage";
import { useTranslation } from "react-i18next";
import { TextRob16Font1S } from "../../components/Text1S";
import { MspTableFilters } from "./MspTable/MspTableFilter";
import { MspTable } from "./MspTable/MspTable";
import { MspModal } from "./MspModal";
import { ModalDeleteMsp } from "./ModalDeleteMsp";
import { useEffect, useState } from "react";
import { ModalUSerNotCreated } from "./ModalUSerNotCreated";
import { ModalDeleteVMsFromMSP } from "./ModalDeleteVMsFromMSP";
import { useBrandMasterResources } from "../../hooks/useBrandMasterResources";
import { AbsoluteBackDrop } from "../../components/AbsoluteBackDrop";
import { useVmResource } from "../../hooks/useVmResource";
import { MspRegisterStep1 } from "./components/MspRegisterStep1";
import { MspRegisterStep2 } from "./components/MspRegisterStep2";
import { useZUserProfile } from "../../stores/useZUserProfile";
import { toast } from "react-toastify";

export const MSPRegisterPage = () => {
  const { theme, mode } = useZTheme();
  const {
    activeStep,
    modalOpen,
    mspToBeDeleted,
    setModalOpen,
    setMspToBeDeleted,
    setActiveStep,
    resetAll,
    setIsEditing,
    brandMasterDeleted,
    vmsToBeDeleted,
    setBrandMasterDeleted,
    setVmsToBeDeleted,
    isEditing,
  } = useZMspRegisterPage();
  const { t } = useTranslation();
  const { isLoading, createAnewBrandMaster, editBrandMaster: editBrandMasterHook } = useBrandMasterResources();
  const { isLoadingDeleteVM, deleteVM } = useVmResource();
  const [openModalUserNotCreated, setOpenModalUserNotCreated] = useState(false);
  const { role } = useZUserProfile();
  const {
    companyName,
    cnpj,
    phone,
    sector,
    contactEmail,
    cep,
    locality,
    countryState,
    city,
    street,
    streetNumber,
    admName,
    admEmail,
    admPhone,
    admPassword,
    brandLogoUrl,
    cityCode,
    district,
    isPoc,
    mspDomain,
    position,
  } = useZMspRegisterPage();

  const resetAllStepStates = () => {
    setIsEditing([]);
    setActiveStep(0);
    resetAll();
  };

  const handleCancelAfterDeleteMSP = () => {
    setMspToBeDeleted(null);
    setModalOpen(null);
    setMspToBeDeleted(null);
    setBrandMasterDeleted(null);
    setVmsToBeDeleted([]);
    resetAllStepStates();
  };

  const handleAfterDeleteMSP = async () => {
    await Promise.all(vmsToBeDeleted.map((vm) => deleteVM(vm.idVM)));
    handleCancelAfterDeleteMSP();
  };

  useEffect(() => {
    return () => {
      resetAllStepStates();
    };
  }, []);

  const handleStep1Next = () => {
    setActiveStep(2);
  };

  const handleStep1Cancel = () => {
    resetAllStepStates();
  };

  const handleStep2Back = () => {
    setActiveStep(1);
  };

  const handleStep2Clear = () => {
    resetAll();
  };

  const handleStep2Submit = async () => {
    const isEditingMode = isEditing.length > 0;
    const mspId = isEditingMode ? isEditing[0] : null;

    if (isEditingMode && mspId && editBrandMasterHook) {
      // Modo edição
      const data = {
        brandName: companyName,
        emailContact: contactEmail,
        cnpj,
        setorName: sector,
        location: locality,
        state: countryState,
        city,
        cep,
        street,
        placeNumber: streetNumber,
        smsContact: phone,
        brandLogo: brandLogoUrl,
        cityCode: cityCode ? parseInt(cityCode) : undefined,
        district,
        isPoc,
      };

      const result = await editBrandMasterHook(mspId, data);
      
      if (result) {
        setModalOpen("editedMsp");
        resetAllStepStates();
      }
    } else if (createAnewBrandMaster) {
      // Modo criação
      const data = {
        companyName,
        cnpj,
        phone,
        sector,
        contactEmail,
        cep,
        locality,
        countryState,
        city,
        street,
        streetNumber,
        admName,
        admEmail,
        admPhone,
        admPassword: "", // Senha será gerada pelo sistema
        brandLogo: brandLogoUrl,
        position: position as "admin",
        mspDomain,
        cityCode: cityCode ? parseInt(cityCode) : undefined,
        district,
        isPoc,
      };

      const result = await createAnewBrandMaster(data);
      
      if (result) {
        setModalOpen("createdMsp");
        resetAllStepStates();
        // TODO: Criar usuário admin se necessário
        // Por enquanto, apenas mostra modal de sucesso
      }
    }
  };

  return (
    <ScreenFullPage
      title={
        <TextRob20Font1MB
          sx={{
            color: theme[mode].primary,
            fontSize: "28px",
            fontWeight: "500",
            lineHeight: "40px",
          }}
        >
          {t("mspRegister.title")}
        </TextRob20Font1MB>
      }
      sxTitleSubTitle={{
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
      sxContainer={{
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "40px",
      }}
      subtitle={
        activeStep > 0 ? (
          <Box
            sx={{
              maxWidth: "646px",
              "@media (max-width: 660px)": { maxWidth: "136px" },
            }}
          >
            <SampleStepper
              activeStep={activeStep - 1}
              stepsNames={[
                t("mspRegister.stepOneTitle"),
                t("mspRegister.stepTwoTitle"),
              ]}
            />
          </Box>
        ) : null
      }
      //  sx= estilização do componente pai
      // children= elementos do componente
      // className= estilização do componente
      // isLoading= ativa um loaing na tela
      // title= componente do titulo
      // subtitle= componente do subtitulo
      // keepSubtitle = false= mantem o subtitulo no caso de tela mobile ou pequena
      // sxContainer= estilização do componente children
      // sxTitleSubTitle= estilização do componente title e subtitle
    >
      {Boolean(isLoading || isLoadingDeleteVM) && <AbsoluteBackDrop open />}
      <Stack
        sx={{
          width: "100%",
          gap: "26px",
          borderRadius: "16px",
          boxSizing: "border-box",
        }}
      >
        {activeStep === 0 && (
          <Stack
            sx={{
              background: theme[mode].mainBackground,
              borderRadius: "16px",
              width: "100%",
              padding: "24px",
              boxSizing: "border-box",
            }}
          >
            <Stack
              sx={{
                gap: "40px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "24px",
                }}
              >
                <TextRob16Font1S
                  sx={{
                    color: theme[mode].black,
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "24px",
                  }}
                >
                  {t("mspRegister.tableTitle")}
                </TextRob16Font1S>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  <MspTableFilters />
                  {(role === "admin" || role === "manager") && (
                    <Button
                      onClick={() => setActiveStep(1)}
                      sx={{
                        background: theme[mode].blue,
                        color: theme[mode].btnText,
                        padding: "8px 16px",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontSize: "14px",
                        fontWeight: "400",
                        "&:hover": {
                          background: theme[mode].blueDark,
                        },
                      }}
                    >
                      {t("mspRegister.createNew")}
                    </Button>
                  )}
                </Stack>
              </Box>
              <MspTable />
            </Stack>
          </Stack>
        )}
        {activeStep === 1 && (
          <MspRegisterStep1
            onNext={handleStep1Next}
            onCancel={handleStep1Cancel}
            isEditing={isEditing.length > 0}
          />
        )}
        {activeStep === 2 && (
          <MspRegisterStep2
            onBack={handleStep2Back}
            onSubmit={handleStep2Submit}
            onClear={handleStep2Clear}
            isEditing={isEditing.length > 0}
          />
        )}
      </Stack>
      {modalOpen !== null && (
        <Modal
          open={modalOpen !== null}
          onClose={() => setModalOpen(null)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            {(modalOpen === "editedMsp" || modalOpen === "createdMsp") && (
              <MspModal
                modalType={modalOpen}
                onClose={() => setModalOpen(null)}
              />
            )}
            {modalOpen === "deletedMsp" && mspToBeDeleted && (
              <ModalDeleteMsp
                mspToDelete={mspToBeDeleted}
                onClose={() => {
                  setModalOpen(null);
                  setMspToBeDeleted(null);
                }}
              />
            )}
          </div>
        </Modal>
      )}
      {openModalUserNotCreated && (
        <ModalUSerNotCreated
          open={openModalUserNotCreated}
          onClose={() => {
            setOpenModalUserNotCreated(false);
            resetAllStepStates();
          }}
        />
      )}
      {Boolean(brandMasterDeleted) && (
        <ModalDeleteVMsFromMSP
          onClose={handleCancelAfterDeleteMSP}
          onConfirm={handleAfterDeleteMSP}
          open={Boolean(brandMasterDeleted)}
          msp={brandMasterDeleted}
          vms={vmsToBeDeleted}
        />
      )}
    </ScreenFullPage>
  );
};
