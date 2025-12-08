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
import {
  deleteAssignmentTicketById,
  getAllAssignsAndUsers,
  getMaintenanceById,
} from "@/utils/api";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function AssignmentMaintenanceIndex({ authedUser, onLogout }) {
  const [maintenaceTicket, setMaintenanceTicket] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const params = useParams();

  const fetchMaintenanceTicket = async () => {
    try {
      const result = await getMaintenanceById(params.ticketId);
      if (result.error) {
        toast.error(result.message);
      } else {
        setMaintenanceTicket(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssignMaintenanceTicketUser = async () => {
    try {
      const result = await getAllAssignsAndUsers(params.ticketId);
      if (result.error) {
        toast.error(result.message);
      } else {
        setAssignedUsers(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMaintenanceTicket();
    fetchAssignMaintenanceTicketUser();
  }, [params.ticketId]);

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
      accessorKey: "phone_number",
      header: "Phone Number",
      cell: ({ row }) => (
        <div className="font-normal">{row.getValue("phone_number")}</div>
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
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const assignmentMaintenanceId = row.original;
        return (
          <div className="flex gap-2 items-center">
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
                      <TooltipContent>Delete Assignment</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="leading-6">
                    Are you sure to delete this assignment ticket?
                  </DialogTitle>
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
                      const response = await deleteAssignmentTicketById(
                        assignmentMaintenanceId.id_assignment_maitenance_task
                      );
                      if (response.error) {
                        toast.error(response.message);
                      } else {
                        fetchAssignMaintenanceTicketUser();
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
    data: assignedUsers[0]?.assign_users || [],
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
            to={`/assignment-maintenance/tasks/create/${params.ticketId}`}
            className="bg-[#515DEF] px-4 py-2 rounded-[4px] text-white hover:shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center gap-2 h-fit"
          >
            Assignment Maintenance
          </Link>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 border-[1px] mt-5 p-5 rounded-md">
        <div className="flex flex-col gap-2">
          <p className="text-[16px] font-medium text-gray-500">Title</p>
          <p>{maintenaceTicket?.title}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[16px] font-medium text-gray-500">Description</p>
          <p>{maintenaceTicket?.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[16px] font-medium text-gray-500">
            Maintenance Status
          </p>
          <div
            className={`font-medium p-2 rounded-md w-fit ${
              maintenaceTicket?.status == "completed"
                ? "bg-[#4AD991]/10 text-[#4AD991] border-[1px] border-[#4AD991]/30"
                : maintenaceTicket?.status == "need_maintenance"
                ? "bg-yellow-100 text-yellow-500 border-[1px] border-yellow-300 dark:bg-[#D9A72E]/30 dark:text-[#D9A72E] dark:border-[#D9A72E]/30"
                : "bg-[#515DEF]/10 text-[#515DEF] border-[1px] border-[#515DEF]/30"
            }`}
          >
            {maintenaceTicket?.status == "completed"
              ? "Completed"
              : maintenaceTicket?.status == "need_maintenance"
              ? "Need Maintenance"
              : "In Progress"}
          </div>
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
                placeholder="Search by name"
                value={table.getColumn("name")?.getFilterValue() ?? ""}
                onChange={(event) => {
                  table.getColumn("name")?.setFilterValue(event.target.value);
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
