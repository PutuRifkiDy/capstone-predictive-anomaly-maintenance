import AppLayout from "@/components/layouts/AppLayout";
import { Link, useParams } from "react-router";
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
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllAssignsAndUsers } from "@/utils/api";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function AssignmentMaintenanceIndex({ authedUser, onLogout }) {
  const [assignMaintenanceTicketsTasks, setAssignMaintenanceTicketsTasks] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const params = useParams();

  const fetchAssignMaintenanceTicketsTasks = async () => {
    try {
      const result = await getAllAssignsAndUsers(params.ticketId);
      if (result.error) {
        toast.error(result.message);
      } else {
        setAssignMaintenanceTicketsTasks(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAssignMaintenanceTicketsTasks();
  }, [params.ticketId]);

  // copyan tanstacktablenya
  const [columnFilters, setColumnFilters] = useState([]);
  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="font-normal">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="font-normal w-36 text-justify">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div
          className={`font-medium p-2 rounded-md w-fit ${
            row.getValue("status") == "completed"
              ? "bg-[#4AD991]/10 text-[#4AD991] border-[1px] border-[#4AD991]/30"
              : row.getValue("status") == "need_maintenance"
              ? "bg-yellow-100 text-yellow-500 border-[1px] border-yellow-300 dark:bg-[#D9A72E]/30 dark:text-[#D9A72E] dark:border-[#D9A72E]/30"
              : "bg-[#515DEF]/10 text-[#515DEF] border-[1px] border-[#515DEF]/30"
          }`}
        >
          {row.getValue("status") == "completed"
            ? "Completed"
            : row.getValue("status") == "need_maintenance"
            ? "Need Maintenance"
            : "In Progress"}
        </div>
      ),
    },
    {
      accessorKey: "assign_users",
      header: "Engineer",
      cell: ({ row }) => {
        const users = row.getValue("assign_users") || [];

        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="p-2 rounded-md dark:bg-[#515DEF]/10 bg-gray-100 border dark:border-[#515DEF]/30 border-gray-100"
              >
                <EllipsisVerticalIcon className="h-4 w-4 text-black dark:text-white" />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Assigned Users</DialogTitle>
                <DialogDescription>
                  List of all engineers assigned to this ticket.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-3">
                {users.length === 0 && (
                  <p className="text-sm text-gray-500">No users assigned.</p>
                )}

                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between border p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">
                        {user.role === "admin" ? "Admin" : "Engineer"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        // const maintenaceTickets = row.original;
        return (
          <div className="flex gap-2 items-center">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    // to={`/maintenance-ticket/update/${maintenaceTickets.id}`}
                    className="text-sm bg-yellow-100 rounded-md p-2 dark:bg-[#D9A72E]/30 dark:text-[#D9A72E] dark:border-[#D9A72E]/30 h-fit"
                  >
                    <PencilSquareIcon className="h-4 w-4 text-yellow-500" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Update Maintenance Tickets</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="none"
                  className="text-sm bg-red-100 rounded-md p-2 dark:bg-[#515DEF]/10  dark:border-[1px] dark:border-[#515DEF]/30 h-fit"
                >
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TrashIcon className="h-4 w-4 text-red-500 dark:text-[#515DEF]" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Delete Maintenance Tickets
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="leading-6">
                    Are you sure to delete this maintenance ticket?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive">Confirm</Button>
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
    data: assignMaintenanceTicketsTasks,
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
      <div className="flex md:flex-row flex-col md:mb-0 md:gap-0 gap-5 justify-between">
        <p className="font-medium text-[32px] tracking-[-0.11px] text-[#000000] dark:text-white">
          Assignment Maintenance
        </p>
        <div className="flex gap-2 items-center">
          <Link
            to={`/maintenance-ticket`}
            className="bg-[#515DEF] px-4 py-2 rounded-[4px] text-white hover:shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center gap-2 h-fit"
          >
            Back
          </Link>
          <Link
            to={`/assignment-maintenance/tasks/create`}
            className="bg-[#515DEF] px-4 py-2 rounded-[4px] text-white hover:shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center gap-2 h-fit"
          >
            Assignment Maintenance
          </Link>
        </div>
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
                placeholder="Search by title"
                value={table.getColumn("title")?.getFilterValue() ?? ""}
                onChange={(event) => {
                  table.getColumn("title")?.setFilterValue(event.target.value);
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
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between space-x-2 py-4 lg:gap-0 md:gap-0 gap-5">
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
                  className="dark:bg-[#515DEF]/10 "
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
