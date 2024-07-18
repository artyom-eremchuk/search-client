import "./AlertWindow.css";
import { IClient, IResponseType } from "../../interfaces";
import { RxCross2 } from "react-icons/rx";

interface AlertWindowProps {
  data: IResponseType;
  closeWindow: (close: null) => void;
}

const AlertWindow = ({
  data: { data, statusCode },
  closeWindow,
}: AlertWindowProps) => {
  const getContent = (data: string | IClient[]) => {
    if (typeof data === "string") {
      return `${statusCode} | ${data}`;
    }

    return data.map(({ email, number }) => (
      <div key={number}>
        {email} - {number}
      </div>
    ));
  };

  const windowContent = getContent(data);

  return (
    <div
      className="alert-window"
      style={
        typeof data === "string"
          ? {
              backgroundColor: "tomato",
            }
          : { backgroundColor: "#159947" }
      }
    >
      <RxCross2 className="cross" onClick={() => closeWindow(null)} />
      {windowContent}
    </div>
  );
};

export default AlertWindow;
