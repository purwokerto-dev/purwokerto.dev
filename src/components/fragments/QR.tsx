import QRCode from "react-qr-code";

const QR = ({ text }: { text: string }) => {
  return <QRCode className="bg-white p-4 rounded-xl" value={text} />;
};

export default QR;
