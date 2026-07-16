import { useAuth } from "@/hooks";

const Avatar = ({ className = "", rounded = "rounded-full" }) => {
  const { user } = useAuth();

  return (
    <div
      className={`${rounded} overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center select-none ${className}`}
    >
      {user?.pictureUrl ? (
        <img
          src={user.pictureUrl}
          alt={user?.name || "Profile"}
          className="w-full h-full object-cover"
          draggable={false}
        />
      ) : (
        <span className="font-bold tracking-wide text-white">
          {user?.name
            ? user.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()
            : "?"}
        </span>
      )}
    </div>
  );
};

export default Avatar;
