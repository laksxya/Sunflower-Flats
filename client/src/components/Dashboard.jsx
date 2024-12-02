import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { HamContext } from "../HamContextProvider";

function Dashboard(props) {
  const { hamActive, hamHandler } = useContext(HamContext);
  const [forBox, setForBox] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getBoxInfo = async () => {
    const whom = JSON.parse(window.localStorage.getItem("whom")).userType;
    try {
      const res = await axios.post(`http://localhost:5000/dashboard/${whom}`, {
        userId: JSON.parse(window.localStorage.getItem("whom")).username,
      });
      if (whom === "admin") {
        const forAdminBox = [
          { "Total Owner": 59 },
          { "Total Tenant": 39 },
          { "Total Employee": 20 },
        ];
        forAdminBox[0]["Total Owner"] = res.data.totalowner;
        forAdminBox[2]["Total Employee"] = res.data.totalemployee;
        forAdminBox[1]["Total Tenant"] = res.data.totaltenant;
        setForBox(forAdminBox);
      }
      if (whom === "owner") {
        const forOwnerBox = [
          { "No of Emloyees": 5 },
          // { "Total Tenant": 4 },
          { "Total complaints": 2 },
        ];
        forOwnerBox[0]["No of Emloyees"] = res.data.totalemployee;
        // forOwnerBox[1]["Total Tenant"] = res.data.totaltenant;
        forOwnerBox[1]["Total complaints"] = res.data.totalcomplaint;
        setForBox(forOwnerBox);
      }
      if (whom === "employee") {
        const forEmployeeBox = [
          { "Total complaints": 31 },
          { Salary: "Rs. 20,0000" },
        ];
        forEmployeeBox[0]["Total complaints"] = res.data.totalcomplaint;
        forEmployeeBox[1].Salary = "Rs. " + res.data.salary;
        setForBox(forEmployeeBox);
      }
      if (whom === "tenant") {
        const forTenantBox = [
          { "tenant id": 12132 },
          { "Tenant Name": "Tharun" },
          { "Tenant age": 20 },
          { dob: "12-1-2002" },
          { "Room no": 123456 },
        ];
        forTenantBox[0]["tenant id"] = res.data[0].tenant_id;
        forTenantBox[1]["Tenant Name"] = res.data[0].name;
        forTenantBox[2]["Tenant age"] = res.data[0].age;
        forTenantBox[3].dob = res.data[0].dob;
        forTenantBox[4]["Room no"] = res.data[0].room_no;
        setForBox(forTenantBox);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBoxInfo().finally(() => setIsLoading(false));
  }, []);

  const modernRules = [
    {
      category: "General Living",
      rules: [
        "Maintain peaceful environment between 10 PM and 7 AM",
        "Pets must be registered with management",
        "Common areas must be kept clean and tidy",
      ]
    },
    {
      category: "Safety & Security",
      rules: [
        "Report suspicious activities immediately",
        "Keep emergency contacts updated",
        "Don't prop open security doors",
      ]
    },
    {
      category: "Maintenance",
      rules: [
        "Report maintenance issues within 24 hours",
        "Allow scheduled maintenance inspections",
        "Keep balconies and patios clean",
      ]
    },
    {
      category: "Amenities",
      rules: [
        "Gym hours: 5 AM - 11 PM daily",
        "Pool area closes at 10 PM",
        "Reserve common rooms 48 hours in advance",
      ]
    }
  ];

  return (
    <div
  onClick={() => {
    if (hamActive === true) {
      hamHandler();
    }
  }}
  className={`min-h-screen p-6 transition-all duration-300 ${
    hamActive ? "blur-sm" : ""
  }`}
>
  {/* Stats Grid */}
  <div className="max-w-7xl mx-auto mb-12">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
      Dashboard Overview
    </h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {forBox &&
        forBox.map((ele, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-md border border-white/10
              p-6 transition-all duration-300 hover:transform hover:scale-[1.02]
              hover:shadow-lg hover:shadow-purple-500/10 group"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 
              group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">
                {Object.values(ele)}
              </h2>
              <p className="text-gray-400 text-sm capitalize">
                {Object.keys(ele)}
              </p>
            </div>

            {/* Decorative Element */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-tl-full" />
          </div>
        ))}
    </div>
  </div>

  {/* Rules Section */}
  <div className="max-w-7xl mx-auto bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 p-8">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-2">
        Community Guidelines
      </h2>
      <p className="text-gray-400">
        Essential rules for harmonious living at Jasmine Towers
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {modernRules.map((category, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center mr-2">
              <span className="text-purple-400">{index + 1}</span>
            </span>
            {category.category}
          </h3>
          <ul className="space-y-3">
            {category.rules.map((rule, ruleIndex) => (
              <li key={ruleIndex} className="flex items-start">
                <svg
                  className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300 text-sm">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Footer Note */}
    <div className="mt-8 pt-6 border-t border-white/10">
      <p className="text-gray-400 text-sm text-center">
        These guidelines are designed to ensure a comfortable living environment for all residents.
        For complete terms, please refer to your lease agreement.
      </p>
    </div>
  </div>
</div>

  );
}

export default Dashboard;
