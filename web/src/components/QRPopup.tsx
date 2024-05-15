import {useEffect, useState} from "react"
import QrCode from "qrcode";
import { useIsUserLoggedIn } from "../hooks";
import { navigate, useStoreDispatch } from "../store";

import {
	Button,
	ButtonGroup,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography
} from "@mui/material"

import { QrCode as QrIcon } from 'lucide-react'

type QRPopupProps = {

}

const QRPopup = ({

}: QRPopupProps) => {
  const user = useIsUserLoggedIn();
  const balance = user!.balance.toFixed(2);
  const dispatch = useStoreDispatch();

	const [open, setOpen] = useState(false)
	const toggleDialog = ():void => setOpen(!open)
	const closeDialog = ():void => setOpen(false)
  const [qrCode, setQrCode] = useState<string>();
	
  useEffect(() => {
    if (!user) {
      return;
    }

    const getQrCode = async () => {
      const qrCode = await QrCode.toDataURL(user.id, {
        errorCorrectionLevel: "H",
      });
      setQrCode(qrCode);
    };
    getQrCode().catch(console.error);
  }, [user]);

	return (
		<>
			<Button onClick={toggleDialog}>
				Payment
				<QrIcon />
			</Button>

			<Dialog
				fullScreen
				open={open}
        onClose={closeDialog}
				>
				<DialogTitle textAlign="center">
					Payment QR
				</DialogTitle>
				<DialogContent sx={{
					flexDirection: "column",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}>
					{qrCode && (
						<img src={qrCode} alt="QR code" className="qr" />)
					}
				</DialogContent>
				<DialogActions sx={{
					display: "flex",
					justifyContent: "center",
					gap: 2,
					paddingBottom: 2
				}}>
					<Button
						variant="contained"
						onClick={()=> dispatch(navigate("/top-up"))}
					>
						Top-up wallet
					</Button>
					<Typography
						lineHeight={2.2}
						component="h4"
						variant="body1"
					>
						Your account balance: {balance}
					</Typography>
					<Button variant="outlined" onClick={closeDialog}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default QRPopup