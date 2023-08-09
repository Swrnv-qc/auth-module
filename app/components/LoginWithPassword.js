import React from "react";

import {
  CoreBox,
  CoreAvatar,
  CoreH6,
  CoreTypographyBody2,
  CoreTextButton,
  CoreForm,
  CoreLink,
  maskEmailOrPhone,
  CoreClasses,
  CoreDomNavigate
} from "@wrappid/core";
import { connect } from "react-redux";

import { AuthContainer } from "./AuthContainer";
import { clearAuthState, saveAuthData } from "../actions/authActions";
import { RouteRegistry } from "../routes.registry";

class LoginWithPassword extends React.Component {
  state = { reset: false };

  componentDidMount = () => {};

  componentDidUpdate = () => {};

  GoBack = () => {
    this.props.SaveAuthData({
      authNextPage                  : "checkUserExist",
      checkLoginOrRegisterError     : false,
      checkLoginOrRegisterLoading   : false,
      checkLoginOrRegisterMsg       : false,
      checkLoginOrRegisterSuccess   : false,
      navigateToOtpSuccess          : false,
      navigateToResetPasswordSuccess: false,
    });
    this.props.ClearAuthState();
  };

  render() {
    const {
      navigateToResetPasswordSuccess,
      navigateToOtpSuccess,
      checkLoginOrRegisterSuccess,
      authNextPage,
    } = this.props;

    if (
      (navigateToResetPasswordSuccess ||
        navigateToOtpSuccess ||
        !checkLoginOrRegisterSuccess) &&
      authNextPage !== RouteRegistry.PASSWORD_ROUTE
    ) {
      return <CoreDomNavigate to={"/" + authNextPage} />;
    }

    return (
      <AuthContainer>
        <CoreBox
          styleClasses={[CoreClasses.ALIGNMENT.ALIGN_ITEMS_CENTER, CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_CENTER, CoreClasses.MARGIN.MB3]}
        >
          <CoreAvatar
            styleClasses={[CoreClasses.DATA_DISPLAY.AVATAR_LARGE]}
            src={this.props.photo ? this.props.photo : "photo.jpg"}
          />
        </CoreBox>

        <CoreH6
          styleClasses={[CoreClasses.TEXT.TEXT_CENTER, CoreClasses.MARGIN.MB1]}
        >
          {this.props?.name || "Unknown"}
        </CoreH6>

        <CoreTypographyBody2
          limitChars={42}
          hideSeeMore={true}
          styleClasses={[CoreClasses.TEXT.TEXT_CENTER]}
        >
          {maskEmailOrPhone(
            this.props.navData?.emailOrPhone
              ? this.props.navData?.emailOrPhone
              : ""
          )}
        </CoreTypographyBody2>

        <CoreBox
          styleClasses={[CoreClasses.TEXT.TEXT_CENTER, CoreClasses.MARGIN.MB1]}
        >
          <CoreTextButton OnClick={this.GoBack} label="Not you" />
        </CoreBox>

        <CoreForm
          styleClasses={CoreClasses.LAYOUT.AUTH_FORM_CONTAINER}
          formId={"loginWithPassword"}
          mode={"edit"}
          authenticated={false}
        />

        <CoreBox
          styleClasses={[
            CoreClasses.LAYOUT.FULL_WIDTH,
            CoreClasses.FLEX.DIRECTION_ROW,
            CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_SPACE_AROUND,
            CoreClasses.ALIGNMENT.ALIGN_ITEMS_CENTER,
            CoreClasses.MARGIN.MT3,
          ]}
        >
          {/**
           * @TODO:
           * we need send otp to the provided email or phone
           * fix required: email or phone getting removed from store auth.navData
           */}
          <CoreLink styleClasses={[CoreClasses.COLOR.TEXT_WHITE]} href="/resetPassword">Reset Password</CoreLink>

          <CoreLink styleClasses={[CoreClasses.COLOR.TEXT_WHITE]} href="/enterOtp">Login with OTP</CoreLink>
        </CoreBox>
      </AuthContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth                          : state.auth,
    authNextPage                  : state.auth.authNextPage,
    checkLoginOrRegisterSuccess   : state.auth.checkLoginOrRegisterSuccess,
    curPage                       : state.auth.curPage,
    name                          : state.auth.name,
    navData                       : state.auth.navData,
    navigateToOtpSuccess          : state.auth.navigateToOtpSuccess,
    navigateToResetPasswordSuccess: state.auth.navigateToResetPasswordSuccess,
    photo                         : state.auth.photo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ClearAuthState: (data) => {
      dispatch(clearAuthState(data));
    },
    SaveAuthData: (data) => {
      dispatch(saveAuthData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithPassword);
