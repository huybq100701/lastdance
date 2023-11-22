'use client'
import React, { useEffect, useState } from "react";
import { fetchTeamMembers, addTeamMember } from "@/lib/actions/event.actions";

interface ViewEventProps {
  eventId: string;
  currentUserId: string;
  authorId: string;
  opponentId: string;
  team1: string;
  team2: string;
}


function ViewEvent({ eventId, currentUserId, authorId, opponentId, team1, team2 }: ViewEventProps) {
  const [team1Members, setTeam1Members] = useState<string[]>([]);
  const [team2Members, setTeam2Members] = useState<string[]>([]);
  const [userTeam, setUserTeam] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const fetchedTeam1Members = await fetchTeamMembers(team1);
        const fetchedTeam2Members = await fetchTeamMembers(team2);
 
        setTeam1Members(fetchedTeam1Members || []); // Handle potential null or undefined
        setTeam2Members(fetchedTeam2Members || []); // Handle potential null or undefined
      
        // Check if the user has already joined a team
        if (fetchedTeam1Members && fetchedTeam1Members.includes(currentUserId)) {
          setUserTeam("team1");
        } else if (fetchedTeam2Members && fetchedTeam2Members.includes(currentUserId)) {
          setUserTeam("team2");
        }
      } catch (error) {
        console.error("Error fetching team members:", error.message);
      }

    };

    fetchMembers();
  }, [team1, team2, currentUserId]);

  const handleJoinTeam1 = async () => {
    try {
      if (userTeam !== "team1" && team1Members.length < 7) {
        await addTeamMember(eventId, "team1", currentUserId);
        const updatedTeam1Members = await fetchTeamMembers(team1);
        setTeam1Members(updatedTeam1Members || []); 
        setUserTeam("team1");
      } else {
        console.log("Cannot join Team 1");
      }
    } catch (error) {
    }
  };

  const handleJoinTeam2 = async () => {
    try {
      if (userTeam !== "team2" && team2Members.length < 7) {
        await addTeamMember(eventId, "team2", currentUserId);
        const updatedTeam2Members = await fetchTeamMembers(team2);
        setTeam2Members(updatedTeam2Members || []); 
        setUserTeam("team2");
      } else {
        console.log("Cannot join Team 2");
      }
    } catch (error) {
      console.error("Failed to join Team 2:", error.message);
    }
  };

  return (
    <div className="border border-gray-300 p-4 my-10 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-white">Event Details</h2>

      {/* Team 1 */}
      <div className="mb-6 grid grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Team 1</h3>
          <ul className="list-none pl-0">
            {team1Members.map((member, index) => (
              <li key={index} className="mb-2 text-white">{member}</li>
            ))}
          </ul>
          {userTeam !== "team1" && (
            <button onClick={handleJoinTeam1} className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-green-600">Join Team 1</button>
          )}
        </div>

        {/* Team 2 */}
        <div> 
          <h3 className="text-xl font-semibold mb-2 text-white">Team 2</h3>
          <ul className="list-none pl-0">
            {team2Members.map((member, index) => (
              <li key={index} className="mb-2 text-white">{member}</li>
            ))}
          </ul>
          {userTeam !== "team2" && (
            <button onClick={handleJoinTeam2} className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-green-600">Join Team 2</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewEvent;