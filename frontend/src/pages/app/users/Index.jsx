import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
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
import { deleteUser, getUsers } from "@/utils/api";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
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

export default function Index({ authedUser, onLogout }) {
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
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className={`font-medium p-2 rounded-md w-fit ${row.getValue("role") == "admin" ? "bg-yellow-100 text-yellow-500 w-fit" : "bg-[#515DEF]/10 text-[#515DEF]"}`}>
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
          <div className="flex gap-2">
            <Link
              to={`/admin/users/update/${user.id}`}
              className="text-sm bg-yellow-100 rounded-md p-2"
            >
              <PencilSquareIcon className="h-4 w-4 text-yellow-500" />
            </Link>
            <Link
              className="text-sm bg-red-100 rounded-md p-2"
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
              <TrashIcon className="h-4 w-4 text-red-500" />
            </Link>
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
