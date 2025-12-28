const MeetingWidget = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Confirmed Meetings</h3>
      <ul className="text-sm text-gray-600">
        <li>📅 Investor Call – Tomorrow 3 PM</li>
        <li>📅 Pitch Review – Friday 1 PM</li>
      </ul>
    </div>
  );
};

export default MeetingWidget;
