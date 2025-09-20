import React, { ReactNode } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../button'

type Props = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    content: ReactNode,
    onConfirm: () => void,
    confirmText?: string,
    cancelText?: string,
}

const ConfirmDialog = (props: Props) => {
    return (
        <Dialog open={props?.isOpen} onOpenChange={props?.setIsOpen}>
            <DialogContent className="sm:max-w-[600px] bg-bgCard text-textColor">
                <DialogHeader style={{ marginBottom: '20px' }}>
                    <DialogTitle>
                        {props?.title}
                    </DialogTitle>
                </DialogHeader>
                {props?.content}
                <DialogFooter className='mt-4'>
                    <Button onClick={() => props?.setIsOpen(false)} variant={'outline'}>{props?.cancelText ? props?.cancelText : 'Cancel'}</Button>

                    <Button className='btn-grad' onClick={() => {
                        props?.onConfirm()
                    }}>{props?.confirmText ? props?.confirmText : 'Confirm'}</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}

export default ConfirmDialog