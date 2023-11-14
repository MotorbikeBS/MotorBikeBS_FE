import React from 'react'
import './style/_extendPostBooting.scss'
import { useAppDispatch } from '../../../../services/store/store';

interface IExtensionPostBootingField {
    endTime: Date;

}
const ExtensionPostBootingDialog = () => {
    const dispatch = useAppDispatch()

    return (
        <div>ExtensionPostBootingDialog</div>
    )
}

export default ExtensionPostBootingDialog