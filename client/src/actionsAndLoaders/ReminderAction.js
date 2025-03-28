// import customFetch from "../utils/customFetch";

// export const action = async ({ request }) => {
//     const formData = await request.formData();
//     const reminderData = {
//         meal: formData.get("meal"),
//         reminderTime: new Date(formData.get("reminderTime")).toISOString(),
//         notificationMethod: formData.get("notificationMethod"),
//         isRecurring: formData.get("isRecurring") === "on",
//         recurringFrequency: formData.get("recurringFrequency") || "",
//     };

//     try {
//         const response = await customFetch.post("/reminders", reminderData, {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         });
//         console.log("Reminder created successfully:", response);

//         return response.data;
//     } catch (error) {
//         console.error("Failed to create reminder:", error.response?.data?.message || error
//         );
//         return { error: error.response?.data?.message || "Failed to create reminder" };
//     }
// };