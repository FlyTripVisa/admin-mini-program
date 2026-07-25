---
import Layout from '../../layouts/Layout.astro';
import { Header } from '../../components/admin/header'; // তোমার ফাইলের পাথ অনুযায়ী দাও
import { CustomerService } from "@/lib/services/customer";
// ... অন্যান্য ইমপোর্ট

const currentPath = '/admin/customers'; // বর্তমান পাথটি এখানে সেট করো
---

<Layout title="Customers">
  <!-- অ্যাডমিন নেভিগেশন -->
  <Header currentPath={currentPath} client:load />

  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-bold tracking-tight">Manage Customers</h2>
      <CreateCustomerButton apiToken={API_TOKEN} client:only="react" />
    </div>

    <!-- বাকি কন্টেন্ট -->
    <CustomersTable data={customers} client:only="react" />
  </div>
</Layout>
