import QRCode from "react-qr-code";

const QR = ({ text }: { text: string }) => {
  return <QRCode value={text} />;
};

export default QR;
