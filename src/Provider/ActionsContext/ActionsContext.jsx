import React, { createContext, useState } from 'react'

export const ActionsContext = createContext();
export const CreatePostModalContext = createContext();

export default function ActionsContextComponent({ children }) {
    const [openModal, setOpenModal] = useState(false);
    const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
    const [switchPage, setSwitchPage] = useState(1);
    const [openFollowersModal, setOpenFollowersModal] = useState(false);
    const [openAboutUserAccountModal, setOpenAboutUserAccountModal] = useState(false);
    const [openSearchComponent, setOpenSearchComponent] = useState(false);

    const Switcher = (number) => {
        setSwitchPage(number === switchPage ? 0 : number);
    }

    return (
        <ActionsContext.Provider value={{
            openModal, setOpenModal,
            openFollowersModal,
            setOpenFollowersModal,
            openAboutUserAccountModal,
            setOpenAboutUserAccountModal,
        }}>
            <CreatePostModalContext.Provider value={{
                openSearchComponent,
                setOpenSearchComponent,
                openCreatePostModal,
                setOpenCreatePostModal,
                switchPage, setSwitchPage,
                Switcher
            }}>
                {children}
            </CreatePostModalContext.Provider>
        </ActionsContext.Provider>
    )
}

