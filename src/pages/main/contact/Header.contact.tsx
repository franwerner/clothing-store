import contactList from "../constant/contactList.contant";

const restContactList = contactList.filter(i => i.type !== "direction")

const ContactHeader = () => {
    return (
        <div className="flex border-b-1 justify-around  pb-3">
        {
            restContactList.map(({ icon, method }) =>
                <div key={method} className="flex gap-1 items-center text-default-600">
                    <span className="material-symbols-outlined text-2xl">
                        {icon}
                    </span>
                    <p >{method}</p>
                </div>
            )
        }
    </div>
    );
};

export default ContactHeader;