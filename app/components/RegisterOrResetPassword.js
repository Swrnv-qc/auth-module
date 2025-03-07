import { useContext } from "react";

import {
  CoreDomNavigate,
  CoreH1,
  CoreTypographyBody1,
  CoreTypographyBody2,
  CoreForm,
  CoreTextButton,
  CoreBox,
  CoreLink,
  stringUtils,
  CoreClasses,
  CoreRouteRegistryContext
} from "@wrappid/core";
import { getConfigurationObject } from "@wrappid/styles";
import { useDispatch, useSelector } from "react-redux";

import { AuthContainer } from "./AuthContainer";
import { saveAuthData } from "../actions/authActions";

const appConfig = getConfigurationObject();

const RegisterOrResetPassword = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const routeRegistry = useContext(CoreRouteRegistryContext);

  const { checkLoginOrRegisterSuccess, authNextPage, navData } = auth;

  const GoBack = () => {
    dispatch(saveAuthData({
      authNextPage                  : routeRegistry.checkuserexist,
      checkLoginOrRegisterError     : false,
      checkLoginOrRegisterLoading   : false,
      checkLoginOrRegisterMsg       : false,
      checkLoginOrRegisterSuccess   : false,
      navigateToOtpSuccess          : false,
      navigateToResetPasswordSuccess: false,
    }));
  };

  const showEmailOrPhone = () => {
    return (
      <CoreTypographyBody2 styleClasses={[CoreClasses.TEXT.TEXT_JUSTIFY]}>
        <CoreTypographyBody2 component="span">
          We have sent you a verification code on
        </CoreTypographyBody2>

        <CoreTypographyBody2
          component="span"
          limitChars={42}
          hideSeeMore={true}

        >
          {" " + stringUtils.maskEmailOrPhone(navData?.emailOrPhone)}
        </CoreTypographyBody2>

        <CoreTypographyBody2 component="span">
          {`. Please enter the One Time Password (OTP) to verify your ${isNaN(navData?.emailOrPhone) ? " email." : " phone."
          }`}
        </CoreTypographyBody2>
      </CoreTypographyBody2>
    );
  };

  if (
    !checkLoginOrRegisterSuccess &&
    (authNextPage !== routeRegistry.register ||
      authNextPage !== routeRegistry.resetpassword)
  ) {
    return <CoreDomNavigate to={"/" + authNextPage} />;
  }
  else
    return (
      <AuthContainer>
        <CoreH1 variant="h5" styleClasses={[CoreClasses.TEXT.TEXT_CENTER]}>
          {`Verify your${isNaN(navData?.emailOrPhone) ? " email" : " phone"
          }`}
        </CoreH1>

        {authNextPage === routeRegistry.register ? (
          showEmailOrPhone()
        ) : (
          <>
            <CoreTypographyBody1 styleClasses={[CoreClasses.TEXT.TEXT_CENTER]}>
              Reset Password through OTP
            </CoreTypographyBody1>

            {showEmailOrPhone()}
          </>
        )}

        <CoreBox
          styleClasses={[CoreClasses.TEXT.TEXT_CENTER, CoreClasses.MARGIN.MB1]}>
          <CoreTextButton OnClick={GoBack} label="Not You" />
        </CoreBox>

        <CoreForm
          styleClasses={CoreClasses.LAYOUT.AUTH_FORM_CONTAINER}
          formId="loginWithResetPassword"
          mode="edit"
          authenticated={false}
          initProps={{ otp: { to: navData?.emailOrPhone } }}
        />

        {authNextPage === routeRegistry?.register && (
          <CoreTypographyBody2>
            By signing up you agree to our{" "}

            <CoreLink
              styleClasses={[CoreClasses.COLOR.TEXT_WHITE]}
              href={
                appConfig?.wrappid?.privacyLink ||
                "#"
              }>
              Privacy Policy
            </CoreLink>{" "}

            <CoreTypographyBody2 component="span">&</CoreTypographyBody2>{" "}

            <CoreLink
              styleClasses={[CoreClasses.COLOR.TEXT_WHITE]}
              href={
                appConfig?.wrappid?.termsLink ||
                "#"
              }>
              Terms
            </CoreLink>

            {"."}
          </CoreTypographyBody2>
        )}
      </AuthContainer>
    );
};

export default RegisterOrResetPassword;