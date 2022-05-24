import "./notification.css";

const Notification = ({ message }) => {
    return (
        <div key={message} className="notification">
            <div className="notification-info">
                <h1>{message}</h1>
            </div>
        </div>
    );
};

export default Notification;
