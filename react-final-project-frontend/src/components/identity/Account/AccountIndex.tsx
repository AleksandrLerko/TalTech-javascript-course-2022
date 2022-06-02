import { FormEvent, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { IDeliveryType } from "../../../domain/IDeliveryType";
import { IServiceResult } from "../../../domain/IServiceResult";
import { IShippingInfo } from "../../../domain/IShippingInfo";
import { DeliveryTypeService } from "../../../services/DeliveryTypeService";
import { ShippingInfoService } from "../../../services/ShippingInfoService";
import { ShippingInfoAppUserService } from "../../../services/ShippingInfoUserService";
import { JWTContext } from "../../../state/identities/JWTContext";
import DeliveryTypeIndex from "../../deliverytype/DeliveryTypeIndex";

let deliveryType: IServiceResult<IDeliveryType[]>;

interface IProps {
    shippingInfos: IShippingInfo[],
    setShippingInfo: (shippingInfo: IShippingInfo) => void
};

let initValue: IProps = {
    shippingInfos: [],
    setShippingInfo: () => { }
};

const AccountIndex = () => {

    const shippingInfoService = new ShippingInfoService();
    const shippingInfoUserService = new ShippingInfoAppUserService();
    const deliveryTypeService = new DeliveryTypeService();

    const [deliveryTypeState, setDeliveryType] = useState(deliveryType);

    const jwt = useContext(JWTContext);

    const setShippingInfo = (shippingInfo: IShippingInfo) => {
        shippingInfoListState.shippingInfos.push(shippingInfo);
        setShippingInfoListState({ ...shippingInfoListState })
    };

    const [shippingInfoListState, setShippingInfoListState] = useState({ ...initValue, setShippingInfo });

    const [shippingInfoState, setShippingInfoState] = useState({
        deliveryTypeId: "",
        addressOne: "",
        addressTwo: ""
    });

    useEffect(() => {
        console.log("Account Index");
        getDataFromApi();
        getData();
    }, [])


    function getDataFromApi(): void {
        deliveryTypeService.getAll().then(data => setDeliveryType(data));
    }

    async function getData(): Promise<void> {
        shippingInfoListState.shippingInfos = [];
        console.log("getData")
        let fetchedIdDataOfCurrentUser = await shippingInfoUserService.getAll();
        console.log(fetchedIdDataOfCurrentUser);
        if (fetchedIdDataOfCurrentUser.data !== undefined) {
            for (const elem of fetchedIdDataOfCurrentUser.data) {
                if (elem.appUserId === jwt.jwtResponse?.appUserId) {

                    let actualNeededData = await shippingInfoService.getById(elem.shippingInfoId);
                    console.log("actualNeededData")
                    console.log(actualNeededData)
                    let validData: IShippingInfo = {
                        id: actualNeededData.data!.id,
                        addressOne: actualNeededData.data!.addressOne,
                        addressTwo: actualNeededData.data!.addressTwo
                    };
                    setShippingInfo(validData);
                }
            }
        }

        console.log(shippingInfoListState);
    }

    const handleChange = (target:
        EventTarget & HTMLInputElement |
        EventTarget & HTMLSelectElement |
        EventTarget & HTMLTextAreaElement) => {

        console.log(target.value)
        setShippingInfoState({ ...shippingInfoState, [target.name]: target.value })

    };

    const handleSubmit = async (target: FormEvent) => {
        target.preventDefault();
        let tempData = await shippingInfoService.add({
            addressOne: shippingInfoState.addressOne,
            addressTwo: shippingInfoState.addressTwo
        })

        await shippingInfoUserService.add({
            appUserId: jwt.jwtResponse?.appUserId as string,
            shippingInfoId: tempData.data?.id as string
        })
        getData();
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Shipping info details</h1>
            <hr />
            <h4>Add new address</h4>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Address 1</label>
                        <input value={shippingInfoState.addressOne} name="addressOne" onChange={(e) => handleChange(e.target)} className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Address 2</label>
                        <input value={shippingInfoState.addressTwo} name="addressTwo" onChange={(e) => handleChange(e.target)} className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Save" className="btn btn-primary accountSubmitButton" />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        {shippingInfoState != undefined ?
                            <>
                                {shippingInfoListState.shippingInfos.length != 0 ?
                                    <>
                                        {shippingInfoListState.shippingInfos.map(item => {
                                            return (
                                                <table className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Address 1:
                                                            </th>
                                                            <th>
                                                                Address 2:
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <tr key={item.id}>
                                                            <td className="col-6">{item.addressOne}</td>
                                                            <td className="col-6">{item.addressTwo}</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                                // <div key={item.id} className="row">
                                                //     <div className="row">{item.addressOne}</div>
                                                //     <div className="row">{item.addressTwo}</div>
                                                // </div>
                                            )
                                        })}
                                    </>
                                    : ""}
                            </>
                            : ""}
                    </div>
                </div>
            </div>
        </form >

    );

};

export default AccountIndex;