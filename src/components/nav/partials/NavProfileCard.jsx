import "./NavProfileCard.scss"
import React, {useEffect, useState} from 'react'
import {Card} from "react-bootstrap"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useNavigation} from "/src/providers/NavigationProvider.jsx"
import {useTheme} from "/src/providers/ThemeProvider.jsx"
import {useUtils} from "/src/hooks/utils.js"
import ImageView from "/src/components/generic/ImageView.jsx"
import StatusCircle from "/src/components/generic/StatusCircle.jsx"
import TextTyper from "/src/components/generic/TextTyper.jsx"

function NavProfileCard({ profile, expanded }) {
    const language = useLanguage()
    const navigation = useNavigation()
    const theme = useTheme()
    const utils = useUtils()

    const expandedClass = expanded ?
        `` :
        `nav-profile-card-shrink`

    const name = profile.name
    const stylizedName = language.getTranslation(profile.locales, "localized_name_stylized", null) ||
        language.getTranslation(profile.locales, "localized_name", null) ||
        name

    let roles = language.getTranslation(profile.locales, "roles", [])
    if(utils.storage.getWindowVariable("suspendAnimations") && roles.length > 2)
        roles = [roles[0]]

    const isDarkTheme = theme.getSelectedTheme()?.dark
    const profilePictureUrl = isDarkTheme ? profile.profilePictureUrlDark : profile.profilePictureUrlLight
    const parsedProfilePictureUrl = language.parseJsonText(profilePictureUrl)

    const statusCircleVisible = Boolean(profile.statusCircleVisible)
    const statusCircleVariant = statusCircleVisible ?
        profile.statusCircleVariant :
        ""

    const statusCircleHoverMessage = statusCircleVisible ?
        language.getTranslation(profile.locales, profile.statusCircleHoverMessage) :
        null

    const statusCircleSize = expanded ?
        StatusCircle.Sizes.DEFAULT :
        StatusCircle.Sizes.SMALL

    const _onStatusBadgeClicked = () => {
        navigation.navigateToSectionWithId("contact")
    }

    return (
        <Card className={`nav-profile-card ${expandedClass}`}>
            <ImageView src={parsedProfilePictureUrl}
                       className={`nav-profile-card-avatar`}
                       alt={name}/>

            {statusCircleVisible && (
                <StatusCircle className={`nav-profile-card-status-circle`}
                              variant={statusCircleVariant}
                              message={statusCircleHoverMessage}
                              size={statusCircleSize} onClick={_onStatusBadgeClicked}/>
            )}

            <div className={`nav-profile-card-info`}>
                <h5 className={`nav-profile-card-name`}>
                    <span dangerouslySetInnerHTML={{__html: stylizedName}}/>
                </h5>

                {roles?.length > 1 && (
                    <TextTyper strings={roles}
                               id={`role-typer`}
                               className={`nav-profile-card-role`}/>
                )}

                {roles?.length === 1 && (
                    <div className={`nav-profile-card-role`}
                         dangerouslySetInnerHTML={{__html: roles[0]}}/>
                )}
            </div>
        </Card>
    )
}

export default NavProfileCard