'use client'
import React, { useEffect, useState } from "react";
import { fetchTeamMembers, addTeamMember } from "@/lib/actions/event.actions";
import Link from "next/link";

interface ViewEventProps {
  eventId: string;
  authorId: string;
  opponentId:string;
  currentUserId: string;
  team1: string;
  team2: string;
}

function ViewEvent({
  eventId,
  currentUserId, 
  team1,
  team2,
}: ViewEventProps) {
  const [team1Members, setTeam1Members] = useState<string[]>([]);
  const [team2Members, setTeam2Members] = useState<string[]>([]);
  const [userTeam, setUserTeam] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);

        const fetchedTeam1Members = await fetchTeamMembers(eventId, "team1"); 
        const fetchedTeam2Members = await fetchTeamMembers(eventId, "team2"); 

        setTeam1Members(fetchedTeam1Members || []);
        setTeam2Members(fetchedTeam2Members || []);

        if (fetchedTeam1Members && fetchedTeam1Members.includes(currentUserId)) {
          setUserTeam("team1");
        } else if (fetchedTeam2Members && fetchedTeam2Members.includes(currentUserId)) {
          setUserTeam("team2");
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [eventId, currentUserId]);

  const handleJoinTeam = async (team: "team1" | "team2") => {
    try {
      const oppositeTeam = team === "team1" ? "team2" : "team1";

      if (
        userTeam !== team &&
        (team === "team1" ? team1Members : team2Members).length < 7 &&
        !(team === "team1" ? team2Members : team1Members).includes(currentUserId)
      ) {
        // Check if the user is a member of the opposite team and remove them
        if (oppositeTeam === "team2" && team1Members.includes(currentUserId)) {
          setTeam1Members((prevTeam1Members) => prevTeam1Members?.filter((member) => member !== currentUserId) || []);
        } else if (oppositeTeam === "team1" && team2Members.includes(currentUserId)) {
          setTeam2Members((prevTeam2Members) => prevTeam2Members?.filter((member) => member !== currentUserId) || []);
        }

        // Add the user to the new team
        await addTeamMember(eventId, team, currentUserId);
        const updatedMembers = await fetchTeamMembers(eventId, team);
        updateTeamMembers(team, updatedMembers);
        setUserTeam(team);
      } else {
        console.log(`Cannot join ${team}`);
      }
    } catch (error) {
      console.error(`Error joining ${team}:`, error);
      // Handle error (show message, log, etc.)
    }
  };

  const updateTeamMembers = (team: "team1" | "team2", updatedMembers: string[]) => {
    if (team === "team1") {
      setTeam1Members((prevTeam1Members) => updatedMembers || []);
    } else {
      // If joining Team 2, remove from Team 1
      if (team === "team2" && team1Members.includes(currentUserId)) {
        setTeam1Members((prevTeam1Members) => prevTeam1Members?.filter((member) => member !== currentUserId) || []);
      }

      setTeam2Members((prevTeam2Members) => updatedMembers || []);
    }
  };

  return (
    <div className="border border-gray-300 p-4 my-10 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-white">Event Details</h2>

      <div className="mb-6 grid grid-cols-2">
        {/* Team 1 */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Team 1</h3>
          <ul className="list-none pl-0">
            {team1Members.map((member, index) => (
              <li key={index} className="mb-2 text-white">
                {member}
              </li>
            ))}
          </ul>
          {userTeam !== "team1" && (
            <button onClick={() => handleJoinTeam("team1")} className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-green-600">Join Team 1</button>
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
            <button onClick={() => handleJoinTeam("team2")} className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-green-600">Join Team 2</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewEvent;