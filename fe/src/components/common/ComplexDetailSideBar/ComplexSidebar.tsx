import { useNavigate } from "react-router-dom";

import type { ComplexFeature } from "../../../types/geojson";
import "./ComplexSidebar.css"
import {
    MapPin,
    Building2,
    Phone,
    Clock3,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

interface Props {
    complex: ComplexFeature | null;
    onClose: () => void;
}

function ComplexSidebar({
    complex,
    onClose,
}: Props) {
    const navigate = useNavigate();

    const props =
        complex?.properties;

    return (
        <aside
            className={`
                complex-map-sidebar
                ${complex
                    ? "complex-map-sidebar--open"
                    : ""
                }
            `}
        >
            <button
                className="
                    complex-map-sidebar__close
                "
                onClick={onClose}
            >
                ✕
            </button>

            <img
                src={
                    props?.image_url
                }
                alt={
                    props?.name
                }
                className="
                    complex-map-sidebar__image
                "
            />

            <div
                className="
        complex-map-sidebar__content
    "
            >
                <h2>
                    {props?.name}
                </h2>

                <p>
                    <MapPin className="complex-map-sidebar__icon" />
                    {props?.address}
                </p>

                <p>
                    <Building2 className="complex-map-sidebar__icon" />
                    {props?.district},{" "}
                    {props?.city}
                </p>

                <p>
                    <Phone className="complex-map-sidebar__icon" />
                    {props?.phone}
                </p>

                <p>
                    <Clock3 className="complex-map-sidebar__icon" />
                    {props?.opening_hours}
                    {" - "}
                    {props?.closing_hours}
                </p>

                <button
                    className="
            complex-map-sidebar__btn
        "
                    onClick={() => {
                        if (!props?.slug)
                            return;

                        navigate(
                            `/complexes/${props.slug}`
                        );
                    }}
                >
                    Đặt sân ngay
                </button>
            </div>
        </aside>
    );
}

export default ComplexSidebar;
