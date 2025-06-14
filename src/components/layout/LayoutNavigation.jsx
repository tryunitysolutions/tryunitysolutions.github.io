import "./LayoutNavigation.scss"
import React from 'react'
import NavSidebar from "/src/components/nav/NavSidebar.jsx"
import NavTabController from "/src/components/nav/NavTabController.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import NavToolThemePicker from "/src/components/nav/tools/NavToolThemePicker.jsx"
import NavToolLanguagePicker from "/src/components/nav/tools/NavToolLanguagePicker.jsx"

function LayoutNavigation({ children, profile = null, sectionLinks = [], categoryLinks = [] }) {
    const viewport = useViewport()
    const shouldAddFooterOffset = viewport.getLayoutConstraints()?.shouldAddFooterOffset
    const offsetClass = shouldAddFooterOffset ? `layout-navigation-children-wrapper-with-offset` : ``

    return (
        <div className={`layout-navigation-wrapper`}>
            {!viewport.isMobileLayout() && (
                <NavSidebar profile={profile} links={sectionLinks}/>
            )}
            {viewport.isMobileLayout() && (
                <div className="top-toolbar" style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", padding: "1rem" }}>
                    <NavToolLanguagePicker />
                    <NavToolThemePicker />
                </div>
            )}
            <div className={`layout-navigation-children-wrapper ${offsetClass}`}>
                {children}
            </div>
            {viewport.isMobileLayout() && (
                <NavTabController links={sectionLinks}/>
            )}
        </div>
    )
}

export default LayoutNavigation