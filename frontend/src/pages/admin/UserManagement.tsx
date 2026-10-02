import { useState, type FormEvent } from "react";
import { FilePenLine, ShieldAlert, Trash2, X } from "lucide-react";
import UserCreate, { type NewUser } from "./components/UserCreate";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type UserRecord = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    accountType: "administrator" | "standard";
    createdAt: string;
    updatedAt: string;
};

const initialUsers: UserRecord[] = [
    { id: "U001", username: "jordan.lee", email: "jordan.lee@example.com", firstName: "Jordan", lastName: "Lee", accountType: "administrator", createdAt: "2025-01-12", updatedAt: "2025-03-04" },
    { id: "U002", username: "samira.patel", email: "samira.patel@example.com", firstName: "Samira", lastName: "Patel", accountType: "standard", createdAt: "2025-02-03", updatedAt: "2025-03-11" },
    { id: "U003", username: "alex.morgan", email: "alex.morgan@example.com", firstName: "Alex", lastName: "Morgan", accountType: "standard", createdAt: "2025-02-18", updatedAt: "2025-03-15" },
];

export default function UserManagement() {
    const [users, setUsers] = useState(initialUsers);
    const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
    const [activeTab, setActiveTab] = useState<"view" | "create">("view");

    const handleCreateUser = (newUser: NewUser) => {
        const createdAt = new Date().toISOString().slice(0, 10);
        setUsers((currentUsers) => {
            const nextId = Math.max(0, ...currentUsers.map((user) => Number(user.id.slice(1)))) + 1;
            return [...currentUsers, {
                ...newUser,
                id: `U${String(nextId).padStart(3, "0")}`,
                createdAt,
                updatedAt: createdAt,
            }];
        });
        setActiveTab("view");
    };

    const handleSaveUser = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editingUser) return;

        const formData = new FormData(event.currentTarget);
        setUsers((currentUsers) => currentUsers.map((user) => user.id === editingUser.id ? {
            ...user,
            username: String(formData.get("username")).trim(),
            email: String(formData.get("email")).trim(),
            firstName: String(formData.get("firstName")).trim(),
            lastName: String(formData.get("lastName")).trim(),
            updatedAt: new Date().toISOString().slice(0, 10),
        } : user));
        setEditingUser(null);
    };

    return (
        <main className="min-h-full bg-white px-4 py-4 text-[#111] sm:px-8 sm:py-6">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6 flex gap-7 border-b border-[#e6e6e6]">
                    {(["view", "create"] as const).map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`border-b-2 px-3 pb-3 text-[0.7rem] font-medium uppercase tracking-[0.04em] transition-colors ${
                                activeTab === tab
                                    ? "border-black text-black"
                                    : "border-transparent text-[#2685a7] hover:text-[#17627d]"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === "view" ? (
                <section className="rounded-[3px] border border-[#d5d5d5] p-6 sm:p-7">
                    <h1 className="border-b border-[#ededed] pb-4 text-lg font-bold uppercase tracking-[-0.03em]">
                        User Management
                    </h1>

                    <div className="mt-6 overflow-hidden border border-[#e2e2e2]">
                        <Table className="min-w-245 table-fixed">
                            <TableHeader>
                                <TableRow className="bg-[#f2f2f2] hover:bg-[#f2f2f2]">
                                    <TableHead className="w-[14%] border-r border-[#e1e1e1] px-4 py-3 text-[0.6rem] font-bold uppercase tracking-wider">Username</TableHead>
                                    <TableHead className="w-[21%] border-r border-[#e1e1e1] px-4 py-3 text-[0.6rem] font-bold uppercase tracking-wider">Email</TableHead>
                                    <TableHead className="w-[12%] border-r border-[#e1e1e1] px-4 py-3 text-[0.6rem] font-bold uppercase tracking-wider">First Name</TableHead>
                                    <TableHead className="w-[12%] border-r border-[#e1e1e1] px-4 py-3 text-[0.6rem] font-bold uppercase tracking-wider">Last Name</TableHead>
                                    <TableHead className="w-[13%] border-r border-[#e1e1e1] px-4 py-3 text-[0.6rem] font-bold uppercase tracking-wider">Created</TableHead>
                                    <TableHead className="w-[13%] border-r border-[#e1e1e1] px-4 py-3 text-[0.6rem] font-bold uppercase tracking-wider">Last Updated</TableHead>
                                    <TableHead className="w-[10%] px-4 py-3 text-[0.6rem] font-bold uppercase tracking-wider">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id} className="border-[#ededed] hover:bg-white">
                                        <TableCell className="border-r border-[#ededed] px-4 py-3 font-mono text-[0.65rem] text-[#505050]">{user.username}</TableCell>
                                        <TableCell className="wrap-break-word border-r border-[#ededed] px-4 py-3 text-[0.7rem] text-[#2685a7]">{user.email}</TableCell>
                                        <TableCell className="border-r border-[#ededed] px-4 py-3 text-[0.7rem]">{user.firstName}</TableCell>
                                        <TableCell className="border-r border-[#ededed] px-4 py-3 text-[0.7rem]">{user.lastName}</TableCell>
                                        <TableCell className="border-r border-[#ededed] px-4 py-3 font-mono text-[0.65rem] text-[#505050]">{user.createdAt}</TableCell>
                                        <TableCell className="border-r border-[#ededed] px-4 py-3 font-mono text-[0.65rem] text-[#505050]">{user.updatedAt}</TableCell>
                                        <TableCell className="px-4 py-3">
                                            <div className="flex items-center gap-3 text-[#2685a7]">
                                                <button type="button" aria-label={`Edit details for ${user.username}`} onClick={() => setEditingUser(user)} className="hover:text-[#17627d]"><FilePenLine className="size-3.5" /></button>
                                                <button type="button" aria-label={`Delete ${user.username}`} onClick={() => setUsers((currentUsers) => currentUsers.filter((currentUser) => currentUser.id !== user.id))} className="hover:text-[#17627d]"><Trash2 className="size-3.5" /></button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-6 flex flex-col items-center justify-center gap-2 border-t border-[#f0f0f0] pt-6 text-[#84c4d9]">
                        <ShieldAlert className="size-7 stroke-[1.5]" />
                        <span className="text-[0.6rem] uppercase tracking-[0.03em]">End of records</span>
                    </div>
                </section>
                ) : (
                    <UserCreate onCreate={handleCreateUser} />
                )}
            </div>

            {editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onMouseDown={(event) => {
                    if (event.target === event.currentTarget) setEditingUser(null);
                }}>
                    <section role="dialog" aria-modal="true" aria-labelledby="edit-user-title" className="w-full max-w-lg border border-[#d5d5d5] bg-white p-6 shadow-xl sm:p-7">
                        <div className="flex items-center justify-between border-b border-[#ededed] pb-4">
                            <h2 id="edit-user-title" className="text-lg font-bold uppercase">Edit User Details</h2>
                            <button type="button" aria-label="Close edit form" onClick={() => setEditingUser(null)} className="text-[#2685a7] hover:text-[#17627d]"><X className="size-4" /></button>
                        </div>
                        <form onSubmit={handleSaveUser} className="mt-6 grid gap-4 sm:grid-cols-2">
                            {(["username", "email", "firstName", "lastName"] as const).map((field) => (
                                <label key={field} className="grid gap-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#505050]">
                                    {field === "firstName" ? "First Name" : field === "lastName" ? "Last Name" : field}
                                    <input name={field} type={field === "email" ? "email" : "text"} defaultValue={editingUser[field]} required className="h-10 border border-[#c9c9c9] bg-[#f3f3f3] px-3 text-sm font-normal normal-case text-[#222] outline-none focus:border-[#2685a7]" />
                                </label>
                            ))}
                            <div className="flex justify-end gap-2 pt-2 sm:col-span-2">
                                <button type="button" onClick={() => setEditingUser(null)} className="h-10 border border-[#c9c9c9] px-4 text-sm text-[#505050] hover:bg-[#f2f2f2]">Cancel</button>
                                <button type="submit" className="h-10 bg-[#063c68] px-4 text-sm text-white transition-colors hover:bg-[#0b507f]">Save</button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </main>
    );
}