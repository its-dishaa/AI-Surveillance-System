import React from "react";

function StatCard({

    title,

    value,

    icon: Icon

}) {

    return (

        <div className="bg-white rounded-2xl shadow-sm border p-5 flex justify-between items-center hover:shadow-lg transition">

            <div>

                <p className="text-gray-500 text-sm">

                    {title}

                </p>

                <h2 className="text-3xl font-bold mt-2">

                    {value}

                </h2>

            </div>

            <div className="bg-blue-100 p-3 rounded-xl">

                <Icon

                    className="text-blue-600"

                    size={28}

                />

            </div>

        </div>

    );

}

export default StatCard;