'use client'
import { useEffect, useState } from "react";

interface ViewEventProps {
  eventId: string;
  currentUserId: string;
  authorId: string;
  opponentId: string;
}

function ViewEvent({ eventId, currentUserId, authorId, opponentId }: ViewEventProps) {
  const [team1Members, setTeam1Members] = useState<string[]>([]);
  const [team2Members, setTeam2Members] = useState<string[]>([]);

  // You can fetch team members based on authorId and opponentId
  // For example, make an API call to get members for each team
  // Assume fetchTeamMembers is an async function that fetches team members by userId
  const fetchTeamMembers = async (teamId: string): Promise<string[]> => {
    // Implementation to fetch team members based on teamId
    // This is just a placeholder, replace it with your actual implementation
    // For example, you might fetch members from a database
    return ["Member1", "Member2", "Member3"];
  };

  // useEffect to fetch team members when the component mounts
  useEffect(() => {
    const fetchMembers = async () => {
      const team1Members = await fetchTeamMembers(authorId);
      const team2Members = await fetchTeamMembers(opponentId);

      setTeam1Members(team1Members);
      setTeam2Members(team2Members);
    };

    fetchMembers();
  }, [authorId, opponentId]);

  const handleJoinTeam1 = () => {
    // Handle logic for joining Team 1
    console.log("Join Team 1");
  };

  const handleJoinTeam2 = () => {
    // Handle logic for joining Team 2
    console.log("Join Team 2");
  };

  return (
    <div>
      <h2>Event Details</h2>
      {/* Render other event details as needed */}
      
      <div>
        <h3>Team 1</h3>
        <ul>
          {team1Members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
        <button onClick={handleJoinTeam1}>Join Team 1</button>
      </div>

      <div>
        <h3>Team 2</h3>
        <ul>
          {team2Members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
        <button onClick={handleJoinTeam2}>Join Team 2</button>
      </div>
    </div>
  );
}

export default ViewEvent;
