import React from 'react'
import UserAuthProvider from './userAuthProvider/userAuthProvider'
import ActionsContextComponent from './ActionsContext/ActionsContext'
import UserDocIdContextComponent from './UserDocIdContext/UserDocIdContext'
import FollowersDatasContextComponent from './FollowersDatasContext/FollowersDatasContext';
import FollowStateContextComponent from './FollowStateContext/FollowStateContext';

export default function Provider({ children }) {
    return (
        <UserAuthProvider>
            <ActionsContextComponent>
                <UserDocIdContextComponent>
                    <FollowersDatasContextComponent>
                        <FollowStateContextComponent>
                            {children}
                        </FollowStateContextComponent>
                    </FollowersDatasContextComponent>
                </UserDocIdContextComponent>
            </ActionsContextComponent>
        </UserAuthProvider>
    )
}
