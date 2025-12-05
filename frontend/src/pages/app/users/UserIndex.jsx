import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteUser, getUsers } from "@/utils/api";
import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function UserIndex({ authedUser, onLogout }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchUsersData = async () => {
    const result = await getUsers();
    if (!result.error) {
      setUsers(result.data);
    } else {
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  // copyan tanstacktablenya
  const [columnFilters, setColumnFilters] = useState([]);
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-normal">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="font-normal">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phone_number",
      header: "Phone Number",
      cell: ({ row }) => (
        <div className="font-normal">{row.getValue("phone_number")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div
          className={`font-medium p-2 rounded-md w-fit ${
            row.getValue("role") == "admin"
              ? "bg-yellow-100 text-yellow-500 border-[1px] border-yellow-300 dark:bg-[#D9A72E]/30 dark:text-[#D9A72E] dark:border-[#D9A72E]/30"
              : "bg-[#515DEF]/10 text-[#515DEF] border-[1px] border-[#515DEF]/30"
          }`}
        >
          {row.getValue("role") == "admin" ? "Admin" : "Engineer"}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex gap-2 items-center">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={`/admin/users/update/${user.id}`}
                    className="text-sm bg-yellow-100 rounded-md p-2 dark:bg-[#D9A72E]/30 dark:text-[#D9A72E] dark:border-[#D9A72E]/30 h-fit"
                  >
                    <PencilSquareIcon className="h-4 w-4 text-yellow-500" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Update User</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Dialog>
              <DialogTrigger asChild>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="none"
                        className="text-sm bg-red-100 rounded-md p-2 dark:bg-[#515DEF]/10  dark:border-[1px] dark:border-[#515DEF]/30 h-fit"
                      >
                        <TrashIcon className="h-4 w-4 text-red-500 dark:text-[#515DEF]" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete User</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Are you sure to delete this user?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      const response = await deleteUser(user.id);
                      if (response.error) {
                        toast.error(response.message);
                      } else {
                        fetchUsersData();
                        toast.success(response.message);
                      }
                    }}
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];

  // copyan tanstacktablenya
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      columnFilters,
      pagination,
    },
  });

  return (
    <AppLayout authedUser={authedUser} onLogout={onLogout}>
      <div className="flex justify-between">
        <p className="font-medium text-[32px] tracking-[-0.11px] text-[#000000] dark:text-white">
          User Management
        </p>
        <Link
          to={"/admin/users/create"}
          className="bg-[#515DEF] md:w-32 w-full px-4 py-2 rounded-[4px] text-white hover:shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center gap-2 h-fit"
        >
          Create User
        </Link>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="text-center py-10 text-lg text-muted-foreground">
            Loading data...
          </div>
        ) : (
          <div className="w-full">
            <div className="flex items-center py-4">
              <Input
                placeholder="Search by email..."
                value={table.getColumn("email")?.getFilterValue() ?? ""}
                onChange={(event) => {
                  table.getColumn("email")?.setFilterValue(event.target.value);
                }}
                className="max-w-sm"
              />
            </div>

            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colspan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex text-sm text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()} (
                {table.getFilteredRowModel().rows.length} rows total)
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Rows per page</p>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value));
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue
                        placeholder={table.getState().pagination.pageSize}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="dark:bg-[#515DEF]/10"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="dark:bg-[#515DEF]/10"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
